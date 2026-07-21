"use client";

import React, { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaSearchPlus } from "react-icons/fa";
import styles from "./photodetails.module.css";

const SinglePhotoUpload = ({
    title = "Upload a photo of your property",
    photo,
    onPhotoUpload,
    onDeletePhoto,
    onSetCoverPhoto,
    onZoomClick,
    photoInputRef,
    isProcessingImage,
}) => {
    return (
        <>
            <p className={styles.desktopUploadPrompt}>Featured Image (optional)</p>

            {!photo ? (
                <div className={`${styles.uploadCard} ${styles.photoInitialUploadCard}`}>
                    <div className={styles.uploadBody}>
                        <label className={styles.uploadLabel}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => onPhotoUpload(e)}
                                className={styles.inputFile}
                                ref={photoInputRef}
                            />
                            <img
                                src="https://placehold.co/100x100/E0E7FF/4F46E5?text=Gallery"
                                alt="gallery icon"
                                className={styles.docGalleryImg}
                            />
                            <p className={styles.photoPrompt}>+ Add 1 photo</p>
                            <p className={styles.dragDropText}>
                                Drag and drop your photo here
                            </p>
                            <p className={styles.uploadInfo}>
                                Only 1 photo allowed · Max size 10 MB · Formats: png, jpg, jpeg, gif,
                                webp, heic, heif
                            </p>
                        </label>
                    </div>
                    {isProcessingImage && (
                        <div className={styles.loadingOverlay}>
                            <div className={styles.spinner}></div>
                            <p>Optimizing image...</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.photoGridContainer}>
                    <div className={styles.photoThumbnailWrapper}>
                        <img src={photo.url} alt="preview" className={styles.previewImg} />
                        <div className={styles.photoOverlay}>
                            <span
                                className={styles.deleteIcon}
                                onClick={onDeletePhoto}
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
                                    onChange={onSetCoverPhoto}
                                    className={styles.makeCoverPhotoRadio}
                                />
                                Make Cover Photo
                            </label>
                        )}
                    </div>

                    {isProcessingImage && (
                        <div className={styles.loadingOverlay}>
                            <div className={styles.spinner}></div>
                            <p>Optimizing image...</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SinglePhotoUpload;
