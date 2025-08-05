'use client';

import React from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { RiGalleryUploadFill } from "react-icons/ri";
import styles from "./photodetails.module.css"; // मुख्य CSS Modules

const VideoSection = ({ video, onVideoUpload }) => {
  return (
    <>
      <h3 className={styles.sectionTitle}>Add one video of property</h3>
      <p className={styles.sectionSubText}>
        A video is worth a thousand pictures. Properties with videos get higher
        page views.
      </p>

      <div className={`${styles.uploadCard} ${styles.videoUploadCard}`}>
        <div className={`${styles.uploadHeader} ${styles.videoUploadHeader}`}>
          <span className={styles.newTag}>NEW</span>
          <span className={styles.uploadHeaderText}>Upload Video</span>
        </div>
        <div className={styles.uploadBody}>
          <label className={styles.uploadLabel}>
            <input
              type="file"
              accept="video/mp4, video/quicktime, video/x-m4v, video/h264"
              onChange={onVideoUpload}
              className={styles.inputFile}
            />
            <span className={styles.videoIcon}>
              <BsFillCameraVideoFill />
            </span>
            <p className={styles.dragDropText}>
              Drag your videos here or{" "}
              <span className={`${styles.linkText} ${styles.uploadLinkText}`}>
                Upload <RiGalleryUploadFill />
              </span>
            </p>
            <p className={styles.uploadInfo}>
              Upload video of max size 80 MB in format .mov, .mp4, .H264.
              Duration should be less than 10 mins.
            </p>
            {video && (
              <p className={styles.videoSuccessMessage}>
                Selected: {video.name}
              </p>
            )}
          </label>
        </div>
      </div>

      <div className={`${styles.warningBox} ${styles.videoWarningBox}`}>
        <p className={styles.warningText}>
          Don’t have a video? We can help you create one with our Paid Plans.{" "}
          <strong className={styles.contactUpgradeText}>
            Contact to Upgrade
          </strong>
        </p>
      </div>
    </>
  );
};

export default VideoSection;
