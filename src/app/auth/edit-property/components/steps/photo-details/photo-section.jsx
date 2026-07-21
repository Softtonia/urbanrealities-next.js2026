'use client';

import React, { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaSearchPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import styles from "./photodetails.module.css";


const CustomDropdown = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.customDropdown} ref={dropdownRef}>
      <div className={styles.dropdownSelected} onClick={toggleDropdown}>
        {value} <IoMdArrowDropdown className={styles.dropdownArrow} />
      </div>
      {isOpen && (
        <ul className={styles.dropdownOptions}>
          {options.map((option) => (
            <li
              key={option}
              className={styles.dropdownOptionItem}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PhotoSection = ({
  title,
  mediaField,
  photos,
  onPhotoUpload,
  onDeletePhoto,
  onSetCoverPhoto,
  onCategoryChange,
  onZoomClick,
  onAddMorePhotosClick,
  photoInputRef,
  isProcessingImages,
}) => {
  const categoryOptions = ["Interior", "Exterior", "Bathroom", "Kitchen", "Balcony", "Other"];

  return (
    <>
    
    <p className={`${styles.desktopUploadPrompt} mt-4`}>{title}</p>

      {photos.length === 0 ? (

        <div className={`${styles.uploadCard} ${styles.photoInitialUploadCard}`}>
          <div className={styles.uploadBody}>
            <label className={styles.uploadLabel}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onPhotoUpload(e, mediaField.id)}
                className={styles.inputFile}
                ref={photoInputRef}
              />
              <img
                src="https://placehold.co/100x100/E0E7FF/4F46E5?text=Gallery"
                alt="gallery icon"
                className={styles.docGalleryImg}
              />
              <p className={styles.photoPrompt}>+ Add at least 5 photos</p>
              <p className={styles.dragDropText}>
                Drag and drop your photos here
              </p>
              <p className={styles.uploadInfo}>
                Upto {mediaField.media_limit} photos · Max size 10 MB · Formats: png, jpg, jpeg, gif,
                webp, heic, heif
              </p>
            </label>
          </div>
          {isProcessingImages && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner}></div>
              <p>Optimizing images...</p>
            </div>
          )}
        </div>
      ) : (

        <>
          <div className={styles.photoGridContainer}>
            {photos.map((photo, i) => (
              <div key={i} className={styles.photoThumbnailWrapper}>
                <img
                  src={photo.url}
                  alt="preview"
                  className={styles.previewImg}
                />
                <div className={styles.photoOverlay}>
                  <span
                    className={styles.deleteIcon}
                    onClick={() => onDeletePhoto(i)}
                  >
                    <MdDelete />
                  </span>
                  <span
                    className={styles.zoomIcon}
                    onClick={() => onZoomClick(photo.url)}
                  >
                    <FaSearchPlus />
                  </span>
                </div>
                {photo.isCover ? (
                  <span className={styles.coverPhotoTag}>Cover photo</span>
                ) : (
                  <label className={styles.makeCoverPhotoLabel}>
                    <input
                      type="radio"
                      name="coverPhoto"
                      checked={photo.isCover}
                      onChange={() => onSetCoverPhoto(i)}
                      className={styles.makeCoverPhotoRadio}
                    />
                    Make Cover Photo
                  </label>
                )}
                {/* <div className={styles.photoActions}>
                  <CustomDropdown
                    value={photo.category}
                    options={categoryOptions}
                    onChange={(newCategory) => onCategoryChange(i, newCategory)}
                  /> */}
                {/* </div> */}
              </div>
            ))}
            {photos.length < 50 && (
              <div
                className={styles.addMorePhotosCard}
                onClick={onAddMorePhotosClick}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onPhotoUpload}
                  className={styles.inputFile}
                  ref={photoInputRef}
                  style={{ display: "none" }}
                />
                <img
                  src="https://placehold.co/100x100/E0E7FF/4F46E5?text=Add"
                  alt="add photos icon"
                  className={`${styles.docGalleryImg} ${styles.addMoreGalleryImg}`}
                />
                <p className={styles.addMoreText}>Add more photos</p>
                <p className={styles.uploadInfo}>
                  Upto 50 photos · Max size 10 MB · Formats: png, jpg, jpeg, gif,
                  webp, heic, heif
                </p>
                <button className={styles.uploadPhotosBtn}>
                  Upload Photos
                </button>
              </div>
            )}
          </div>
          {isProcessingImages && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner}></div>
              <p>Optimizing images...</p>
            </div>
          )}
        </>
      )}

      {photos.length > 0 && photos.length < 5 && (
        <div className={`${styles.warningBox} ${styles.photoWarningBox} ${styles.mt - 4}`}>
          <p className={styles.warningText}>
            Less photos added! Show your complete property by adding other area
            photos too,e.g: Kitchen, balcony, etc{" "}
            <span
              className={`${styles.linkText} ${styles.addMoreLink}`}
              onClick={onAddMorePhotosClick}
            >
              Add more
            </span>
          </p>
        </div>
      )}


      <div className={styles.mobileHelp}>
        <p className={styles.mobileHelpTitle}>
          Now you can also upload photos directly from your phone
        </p>
        <p className={`${styles.phone} ${styles.mobilePhoneNumber}`}>
          With your registered number{" "}
          <strong className={styles.phoneNumberValue}>+91-1234567890</strong>
        </p>
        <div className={`${styles.actions} ${styles.mobileUploadActions}`}>
          <label
            className={`${styles.radioLabel} ${styles.whatsappRadioLabel}`}
          >
            <input
              type="radio"
              name="uploadOption"
              className={`${styles.radioInput} ${styles.whatsappRadioInput}`}
            />
            <img
              src="https://placehold.co/24x24/075E54/FFFFFF?text=WA"
              alt="whatsapp icon"
              className={styles.whatsappIcon}
            />{" "}
            <span className={styles.radioOptionText}>
              Send photos over WhatsApp
            </span>
          </label>

          <label className={`${styles.radioLabel} ${styles.smsRadioLabel}`}>
            <input
              type="radio"
              name="uploadOption"
              className={`${styles.radioInput} ${styles.smsRadioInput}`}
            />
            <span className={styles.radioOptionText}>
              📩 Get photo upload link over SMS
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default PhotoSection;
