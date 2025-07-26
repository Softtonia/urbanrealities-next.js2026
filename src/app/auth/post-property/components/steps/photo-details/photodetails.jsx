"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io"; 
import { IoArrowBackSharp } from "react-icons/io5";

import VideoSection from "./video-section";
import PhotoSection from "./photo-section";

import styles from "./photodetails.module.css"; // Main CSS Module

const PhotoDetails = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const photoInputRef = useRef(null); // Ref for photo input
  const [isProcessingImages, setIsProcessingImages] = useState(false); // State to handle image processing
  const [fullScreenImage, setFullScreenImage] = useState(null); // State for full-screen image view

  // Function to optimize the image (core logic for the photo section)
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

  // Handler for photo upload
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
      return updatedPhotos;
    });
  };

  // Handler for video upload
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
      } else {
        console.log("Video file must be less than 80MB");
      }
    } else {
      console.log("Invalid video format");
    }
  };

  // Handler to delete a photo
  const handleDeletePhoto = (indexToDelete) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.filter((_, i) => i !== indexToDelete);
      if (prevPhotos[indexToDelete].isCover && updatedPhotos.length > 0) {
        updatedPhotos[0].isCover = true;
      }
      return updatedPhotos;
    });
  };

  // Handler to set a photo as cover photo
  const handleSetCoverPhoto = (indexToSetCover) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo, i) => ({
        ...photo,
        isCover: i === indexToSetCover,
      }))
    );
  };

  // Handler to change photo category
  const handleCategoryChange = (index, newCategory) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo, i) =>
        i === index ? { ...photo, category: newCategory } : photo
      )
    );
  };

  // Handler for 'Add more photos' button
  const handleAddMorePhotosClick = () => {
    photoInputRef.current.click();
  };

  // On zoom icon click, show the full-screen image
  const handleZoomClick = (imageUrl) => {
    setFullScreenImage(imageUrl);
  };

  // Close full-screen image view
  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  // Handler for 'Continue' button
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
              <div className={` ${styles.backWrapper} d-flex align-item-center`}>
        <IoArrowBackSharp className="back-btn " size={20} onClick={goBack} />
        <p className="m-0">Back</p>
      </div>
      {/* Video upload section component */}
      <VideoSection
        video={video}
        onVideoUpload={handleVideoUpload}
      />

      {/* Photo upload section component */}
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

      {/* 'Continue' button */}
      <button
        className={`continueBtn ${styles.continueBtn}`}
        onClick={handleContinue}
      >
        Continue
      </button>


      {/* Full-screen image viewer (Modal) */}
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
