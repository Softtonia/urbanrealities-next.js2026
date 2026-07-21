"use client";

import React, { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";

import VideoSection from "./video-section";
import PhotoSection from "./photo-section";

import styles from "./photodetails.module.css";
import { PostPropertyContext } from "@/app/auth/edit-property/context/PostPropertyContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import SinglePhotoUpload from "./SinglePhotoUpload";

const PhotoDetails = () => {
  const { formData, updateFormData, setFormData } = useContext(PostPropertyContext);
  const { token } = useSiteSettings();

  const router = useRouter();
  const [photos, setPhotos] = useState(formData.photos || []);
  const [singlePhoto, setSinglePhoto] = useState(formData.singlePhoto || null); // ✅ For single upload
  const [video, setVideo] = useState(formData.video || null);
  const photoInputRef = useRef(null);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  // === Existing helper ===
  const getMediaFields = () => {
    if (!Array.isArray(formData.custom_field)) return [];
    return formData.custom_field.filter(field => field.field_type === "media"
      //  || field.template.name ==='property.gallery'
    );
  };
  const mediaField = getMediaFields();

  // === Existing image optimization (reuse) ===
  const optimizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 900;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const optimizedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          }, "image/jpeg", 0.8);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // === Existing multi photo upload ===


  // === ✅ Single photo upload handler ===
  const handleSinglePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessingImages(true);
    const optimizedFile = await optimizeImage(file);
    setIsProcessingImages(false);

    const newPhoto = {
      file: optimizedFile,
      url: URL.createObjectURL(optimizedFile),
      isCover: true,
      category: "Main",
    };

    setSinglePhoto(newPhoto);
    updateFormData("featured_image", newPhoto);
  };

  const handleDeleteSinglePhoto = () => {
    setSinglePhoto(null);
    updateFormData("featured_image", null);
  };

  const handleSetSingleCoverPhoto = () => {
    if (singlePhoto) {
      setSinglePhoto({ ...singlePhoto, isCover: true });
      updateFormData("featured_image", { ...singlePhoto, isCover: true });
    }
  };
  console.log("==>", formData)

  // === Existing handlers (unchanged) ===





  const handlePhotoUpload = async (e, field_id) => {
    console.log("Uploading for field:", field_id);

    const selectedFiles = Array.from(e.target.files);

    // 1. Get allowed formats from mediaFields (flatten into array)
    const allowedFormats = mediaField
      .map(field => field.media_format?.split(",") || [])
      .flat()
      .map(fmt => fmt.trim().toLowerCase());

    // 2. Convert formats to MIME types for validation
    const allowedMimeTypes = allowedFormats.map(fmt => `image/${fmt}`);

    // 3. Filter files by allowed MIME types
    const validImages = selectedFiles.filter(file =>
      allowedMimeTypes.includes(file.type.toLowerCase())
    );

    // 4. Size validation
    const maxSizeMB = Math.max(...mediaField.map(f => parseFloat(f.media_size || "5")));
    const sizeValidatedImages = validImages.filter(file =>
      file.size <= maxSizeMB * 1024 * 1024
    );

    if (sizeValidatedImages.length === 0) {
      alert(`No valid images found. Allowed formats: ${allowedFormats.join(", ")} | Max size: ${maxSizeMB}MB`);
      return;
    }

    // 5. Limit validation
    const maxLimit = Math.max(...mediaField.map(f => parseInt(f.media_limit)));
    const existingImagesCount = photos.length; // total across all? or per field?
    if (existingImagesCount + sizeValidatedImages.length > maxLimit) {
      alert(`You can only upload up to ${maxLimit} images.`);
      return;
    }

    setIsProcessingImages(true);
    const optimizedFiles = await Promise.all(sizeValidatedImages.map(file => optimizeImage(file)));
    setIsProcessingImages(false);

    const newPhotos = optimizedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isCover: false,
      category: "Interior",
    }));

    // Update local state (for preview in UI)
    setPhotos(prevPhotos => {
      const updatedPhotos = [...prevPhotos, ...newPhotos].slice(0, maxLimit);
      if (updatedPhotos.length > 0 && !updatedPhotos.some(p => p.isCover)) {
        updatedPhotos[0].isCover = true;
      }
      return updatedPhotos;
    });

    // ✅ Update formData.repeater_field with field_id
    setFormData(prevFormData => {
      const repeater = [...(prevFormData.repeater_fields || [])];
      const existingFieldIndex = repeater.findIndex(item => item.custom_field_id === field_id);

      if (existingFieldIndex !== -1) {
        repeater[existingFieldIndex] = {
          ...repeater[existingFieldIndex],
          field_value: [...(repeater[existingFieldIndex].field_value || []), ...newPhotos]
        };
      } else {
        repeater.push({
          custom_field_id: field_id,
          field_type: "media",
          field_value: newPhotos
        });
      }

      return { ...prevFormData, repeater_fields: repeater };
    });

  };

  console.log("dmeo", formData.repeater_fields)



  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ["video/mp4", "video/quicktime", "video/x-m4v", "video/h264"].includes(
        file.type
      )
    ) {
      if (file.size <= 80 * 1024 * 1024) {
        setVideo(file);
        updateFormData("video", file);
      } else {
        console.log("Video file must be less than 80MB");
      }
    } else {
      console.log("Invalid video format");
    }
  };

  const handleDeletePhoto = (indexToDelete, field_id) => {
    setPhotos(prevPhotos => {
      const photoToDelete = prevPhotos[indexToDelete]; // the actual image object
      const updatedPhotos = prevPhotos.filter((_, i) => i !== indexToDelete);

      // Reassign cover photo if needed
      if (photoToDelete.isCover && updatedPhotos.length > 0) {
        updatedPhotos[0].isCover = true;
      }

      // Update repeater_fields in formData
      setFormData(prevFormData => {
        const repeater = [...(prevFormData.repeater_fields || [])];
        const fieldIndex = repeater.findIndex(item => item.custom_field_id === field_id);

        if (fieldIndex !== -1) {
          const updatedFieldValue = repeater[fieldIndex].field_value.filter(
            img => img.url !== photoToDelete.url // match by unique property
          );

          if (updatedFieldValue.length > 0) {
            repeater[fieldIndex] = {
              ...repeater[fieldIndex],
              field_value: updatedFieldValue
            };
          } else {
            repeater.splice(fieldIndex, 1); // remove entire entry if empty
          }
        }

        return { ...prevFormData, repeater_fields: repeater };
      });

      // Update root photos in formData
      updateFormData("photos", updatedPhotos);

      return updatedPhotos;
    });
  };



  const handleSetCoverPhoto = (indexToSetCover) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.map((photo, i) => ({
        ...photo,
        isCover: i === indexToSetCover,
      }));
      updateFormData("photos", updatedPhotos);
      return updatedPhotos;
    });
  };

  const handleCategoryChange = (index, newCategory) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.map((photo, i) =>
        i === index ? { ...photo, category: newCategory } : photo
      );
      updateFormData("photos", updatedPhotos);
      return updatedPhotos;
    });
  };

  const handleAddMorePhotosClick = () => { photoInputRef.current.click(); };
  const handleZoomClick = (imageUrl) => { setFullScreenImage(imageUrl); };
  const handleCloseFullScreen = () => { setFullScreenImage(null); };

  const handleContinue = () => {
    router.push(`/auth/edit-property/featurepricing` + (typeof window !== 'undefined' ? window.location.search : ''));
  };

  const goBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.backWrapper}>
        <IoArrowBackSharp size={20} onClick={goBack} />
        <p className="m-0">Back</p>
      </div>
      <h3 className={styles.sectionTitle}>
        Add photos of your property{" "}
        <span className={styles.optionalText}>(Optional)</span>
      </h3>
      <p className={styles.sectionSubText}>
        A picture is worth a thousand words. 87% of buyers look at photos before
        buying.
      </p>

      {/* === New Single Upload Section === */}
      <SinglePhotoUpload
        // title="Upload Main Property Photo"
        photo={singlePhoto}
        onPhotoUpload={handleSinglePhotoUpload}
        onDeletePhoto={handleDeleteSinglePhoto}
        onSetCoverPhoto={handleSetSingleCoverPhoto}
        onZoomClick={handleZoomClick}
        photoInputRef={photoInputRef}
        isProcessingImage={isProcessingImages}
      />

      {/* === Existing multi-upload PhotoSection === */}
      {Array.isArray(mediaField) && mediaField.map((field, index) => (
        <PhotoSection
          key={index}
          title={field.field_label}
          mediaField={field}
          photos={photos}
          onPhotoUpload={(e) => handlePhotoUpload(e, field.id)}
          onDeletePhoto={(photoIndex) => handleDeletePhoto(photoIndex, field.id)}
          onSetCoverPhoto={(photoIndex) => handleSetCoverPhoto(photoIndex, field.id)}
          onCategoryChange={handleCategoryChange}
          onZoomClick={handleZoomClick}
          onAddMorePhotosClick={handleAddMorePhotosClick}
          photoInputRef={photoInputRef}
          isProcessingImages={isProcessingImages}
        />
      ))}

      <button className={` continueBtn ${styles.continueBtn}`} onClick={handleContinue}>
        Continue
      </button>

      {fullScreenImage && (
        <div className={styles.fullScreenViewer}>
          <button className={styles.closeButton} onClick={handleCloseFullScreen}>
            <IoMdClose />
          </button>
          <img src={fullScreenImage} alt="Full Screen Preview" className={styles.fullScreenImage} />
        </div>
      )}
    </div>
  );
};

export default PhotoDetails;
