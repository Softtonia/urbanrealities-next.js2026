"use client";

import React, { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";

import VideoSection from "./video-section";
import PhotoSection from "./photo-section";

import styles from "./photodetails.module.css";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";

const PhotoDetails = () => {
  const { formData, updateFormData } = useContext(PostPropertyContext);
  const router = useRouter();
  const [photos, setPhotos] = useState(formData.photos || []);
  const [video, setVideo] = useState(formData.video || null);
  const photoInputRef = useRef(null);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const optimizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

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
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          }, 'image/jpeg', 0.8);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validImages = selectedFiles.filter((file) =>
      [
        "image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif",
        "image/heic", "image/heif",
      ].includes(file.type)
    );

    if (validImages.length === 0) return;

    setIsProcessingImages(true);

    const optimizedImagesPromises = validImages.map(file => optimizeImage(file));
    const optimizedFiles = await Promise.all(optimizedImagesPromises);

    setIsProcessingImages(false);

    const newPhotos = optimizedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isCover: false,
      category: "Interior",
    }));

    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos, ...newPhotos].slice(0, 50);
      if (updatedPhotos.length > 0 && !updatedPhotos.some((p) => p.isCover)) {
        updatedPhotos[0].isCover = true;
      }
      updateFormData("photos", updatedPhotos);
      return updatedPhotos;
    });
  };

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

  const handleDeletePhoto = (indexToDelete) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.filter((_, i) => i !== indexToDelete);
      if (prevPhotos[indexToDelete].isCover && updatedPhotos.length > 0) {
        updatedPhotos[0].isCover = true;
      }
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

  const handleAddMorePhotosClick = () => {
    photoInputRef.current.click();
  };

  const handleZoomClick = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  const handleContinue = () => {
    router.push("/auth/post-property/featurepricing");
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
      <VideoSection
        video={video}
        onVideoUpload={handleVideoUpload}
      />

      <PhotoSection
        photos={photos}
        onPhotoUpload={handlePhotoUpload}
        onDeletePhoto={handleDeletePhoto}
        onSetCoverPhoto={handleSetCoverPhoto}
        onCategoryChange={handleCategoryChange}
        onZoomClick={handleZoomClick}
        onAddMorePhotosClick={handleAddMorePhotosClick}
        photoInputRef={photoInputRef}
        isProcessingImages={isProcessingImages}
      />

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
