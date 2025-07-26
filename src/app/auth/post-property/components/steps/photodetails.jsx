// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { BsFillCameraVideoFill } from "react-icons/bs";
// import { RiGalleryUploadFill } from "react-icons/ri";
// import { MdDelete } from "react-icons/md";
// import { FaSearchPlus } from "react-icons/fa";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { IoMdClose } from "react-icons/io"; // क्लोज बटन के लिए नया इंपोर्ट
// import styles from "./photodetails.module.css"; // CSS Modules import

// const PhotoDetails = () => {
//   const router = useRouter();
//   const [photos, setPhotos] = useState([]);
//   const [video, setVideo] = useState(null);
//   const photoInputRef = useRef(null);
//   const [isProcessingImages, setIsProcessingImages] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState(null); // फुल-स्क्रीन इमेज के लिए नया स्टेट

//   // इमेज को ऑप्टिमाइज़ करने का फ़ंक्शन (HTML Canvas API का उपयोग करके)
//   const optimizeImage = (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           const ctx = canvas.getContext('2d');

//           const MAX_WIDTH = 1200;
//           const MAX_HEIGHT = 900;
//           let width = img.width;
//           let height = img.height;

//           if (width > height) {
//             if (width > MAX_WIDTH) {
//               height *= MAX_WIDTH / width;
//               width = MAX_WIDTH;
//             }
//           } else {
//             if (height > MAX_HEIGHT) {
//               width *= MAX_HEIGHT / height;
//               height = MAX_HEIGHT;
//             }
//           }

//           canvas.width = width;
//           canvas.height = height;

//           ctx.drawImage(img, 0, 0, width, height);

//           canvas.toBlob((blob) => {
//             const optimizedFile = new File([blob], file.name, {
//               type: 'image/jpeg',
//               lastModified: Date.now(),
//             });
//             resolve(optimizedFile);
//           }, 'image/jpeg', 0.8);
//         };
//         img.src = event.target.result;
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handlePhotoUpload = async (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const validImages = selectedFiles.filter((file) =>
//       [
//         "image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif",
//         "image/heic", "image/heif",
//       ].includes(file.type)
//     );

//     if (validImages.length === 0) return;

//     setIsProcessingImages(true);

//     const optimizedImagesPromises = validImages.map(file => optimizeImage(file));
//     const optimizedFiles = await Promise.all(optimizedImagesPromises);

//     setIsProcessingImages(false);

//     const newPhotos = optimizedFiles.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       isCover: false,
//       category: "Interior",
//     }));

//     setPhotos((prevPhotos) => {
//       const updatedPhotos = [...prevPhotos, ...newPhotos].slice(0, 50);
//       if (updatedPhotos.length > 0 && !updatedPhotos.some((p) => p.isCover)) {
//         updatedPhotos[0].isCover = true;
//       }
//       return updatedPhotos;
//     });
//   };

//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (
//       file &&
//       ["video/mp4", "video/quicktime", "video/x-m4v", "video/h264"].includes(
//         file.type
//       )
//     ) {
//       if (file.size <= 80 * 1024 * 1024) {
//         setVideo(file);
//       } else {
//         console.log("Video file must be less than 80MB");
//       }
//     } else {
//       console.log("Invalid video format");
//     }
//   };

//   const handleDeletePhoto = (indexToDelete) => {
//     setPhotos((prevPhotos) => {
//       const updatedPhotos = prevPhotos.filter((_, i) => i !== indexToDelete);
//       if (prevPhotos[indexToDelete].isCover && updatedPhotos.length > 0) {
//         updatedPhotos[0].isCover = true;
//       }
//       return updatedPhotos;
//     });
//   };

//   const handleSetCoverPhoto = (indexToSetCover) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.map((photo, i) => ({
//         ...photo,
//         isCover: i === indexToSetCover,
//       }))
//     );
//   };

//   const handleCategoryChange = (index, newCategory) => {
//     setPhotos((prevPhotos) =>
//       prevPhotos.map((photo, i) =>
//         i === index ? { ...photo, category: newCategory } : photo
//       )
//     );
//   };

//   const handleAddMorePhotosClick = () => {
//     photoInputRef.current.click();
//   };

//   const handleContinue = () => {
//     router.push("/auth/post-property/featurepricing");
//   };

//   // ज़ूम आइकन पर क्लिक करने पर फुल-स्क्रीन इमेज दिखाएं
//   const handleZoomClick = (imageUrl) => {
//     setFullScreenImage(imageUrl);
//   };

//   // फुल-स्क्रीन इमेज को बंद करें
//   const handleCloseFullScreen = () => {
//     setFullScreenImage(null);
//   };

//   // कस्टम ड्रॉपडाउन कंपोनेंट
//   const CustomDropdown = ({ value, options, onChange }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const toggleDropdown = () => setIsOpen(!isOpen);

//     const handleOptionClick = (option) => {
//       onChange(option);
//       setIsOpen(false);
//     };

//     // बाहर क्लिक करने पर ड्रॉपdown बंद करें
//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//           setIsOpen(false);
//         }
//       };
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, [dropdownRef]);

//     return (
//       <div className={styles.customDropdown} ref={dropdownRef}>
//         <div className={styles.dropdownSelected} onClick={toggleDropdown}>
//           {value} <IoMdArrowDropdown className={styles.dropdownArrow} />
//         </div>
//         {isOpen && (
//           <ul className={styles.dropdownOptions}>
//             {options.map((option) => (
//               <li
//                 key={option}
//                 className={styles.dropdownOptionItem}
//                 onClick={() => handleOptionClick(option)}
//               >
//                 {option}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   };

//   const categoryOptions = ["Interior", "Exterior", "Bathroom", "Kitchen", "Balcony", "Other"];

//   return (
//     <div className={styles.wrapper}>
//       <h2 className={styles.sectionTitle}>Add one video of property</h2>
//       <p className={styles.sectionSubText}>
//         A video is worth a thousand pictures. Properties with videos get higher
//         page views.
//       </p>

//       <div className={styles.videoUploadCard}>
//         <div className={styles.videoUploadHeader}>
//           <span className={styles.newTag}>NEW</span>
//           <strong className={styles.uploadHeaderText}>Upload Video</strong>
//         </div>
//         <div className={styles.uploadBody}>
//           <label className={styles.uploadLabel}>
//             <input
//               type="file"
//               accept="video/mp4, video/quicktime, video/x-m4v, video/h264"
//               onChange={handleVideoUpload}
//               className={styles.inputFile}
//             />
//             <span className={styles.videoIcon}>
//               <BsFillCameraVideoFill />
//             </span>
//             <p className={styles.dragDropText}>
//               Drag your videos here or{" "}
//               <span className={`${styles.linkText} ${styles.uploadLinkText}`}>
//                 Upload <RiGalleryUploadFill />
//               </span>
//             </p>
//             <p className={styles.uploadInfo}>
//               Upload video of max size 80 MB in format .mov, .mp4, .H264.
//               Duration should be less than 10 mins.
//             </p>
//             {video && (
//               <p className={styles.videoSuccessMessage}>
//                 Selected: {video.name}
//               </p>
//             )}
//           </label>
//         </div>
//       </div>

//       <div className={styles.warningBox}>
//         <p className={styles.warningText}>
//           Don’t have a video? We can help you create one with our Paid Plans.{" "}
//           <strong className={styles.contactUpgradeText}>
//             Contact to Upgrade
//           </strong>
//         </p>
//       </div>

//       <h2 className={styles.sectionTitle}>
//         Add photos of your property{" "}
//         <span className={styles.optionalText}>(Optional)</span>
//       </h2>
//       <p className={styles.sectionSubText}>
//         A picture is worth a thousand words. 87% of buyers look at photos before
//         buying.
//       </p>
//       <p className={styles.desktopUploadPrompt}>Upload from desktop</p>

//       {photos.length === 0 ? (
//         <div className={`${styles.uploadCard} ${styles.photoInitialUploadCard}`}>
//           <div
//             className={styles.uploadBody}
//           >
//             <label
//               className={styles.uploadLabel}
//             >
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handlePhotoUpload}
//                 className={styles.inputFile}
//                 ref={photoInputRef}
//               />
//               <img
//                 src="https://placehold.co/100x100/E0E7FF/4F46E5?text=Gallery"
//                 alt="gallery icon"
//                 className={styles.docGalleryImg}
//               />
//               <p className={styles.photoPrompt}>+ Add at least 5 photos</p>
//               <p className={styles.dragDropText}>
//                 Drag and drop your photos here
//               </p>
//               <p
//                 className={styles.uploadInfo}
//               >
//                 Upto 50 photos · Max size 10 MB · Formats: png, jpg, jpeg, gif,
//                 webp, heic, heif
//               </p>
//             </label>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className={styles.photoGridContainer}>
//             {photos.map((photo, i) => (
//               <div key={i} className={styles.photoThumbnailWrapper}>
//                 <img
//                   src={photo.url}
//                   alt="preview"
//                   className={styles.previewImg}
//                 />
//                 <div className={styles.photoOverlay}>
//                   <span
//                     className={styles.deleteIcon}
//                     onClick={() => handleDeletePhoto(i)}
//                   >
//                     <MdDelete />
//                   </span>
//                   <span
//                     className={styles.zoomIcon}
//                     onClick={() => handleZoomClick(photo.url)} // ज़ूम आइकन पर क्लिक हैंडलर जोड़ा
//                   >
//                     <FaSearchPlus />
//                   </span>
//                 </div>
//                 {photo.isCover ? (
//                   <span className={styles.coverPhotoTag}>Cover photo</span>
//                 ) : (
//                   <label className={styles.makeCoverPhotoLabel}>
//                     <input
//                       type="radio"
//                       name="coverPhoto"
//                       checked={photo.isCover}
//                       onChange={() => handleSetCoverPhoto(i)}
//                       className={styles.makeCoverPhotoRadio}
//                     />
//                     Make Cover Photo
//                   </label>
//                 )}
//                 <div className={styles.photoActions}>
//                   <CustomDropdown
//                     value={photo.category}
//                     options={categoryOptions}
//                     onChange={(newCategory) => handleCategoryChange(i, newCategory)}
//                   />
//                 </div>
//               </div>
//             ))}
//             {photos.length < 50 && (
//               <div
//                 className={styles.addMorePhotosCard}
//                 onClick={handleAddMorePhotosClick}
//               >
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handlePhotoUpload}
//                   className={styles.inputFile}
//                   ref={photoInputRef}
//                   style={{ display: "none" }}
//                 />
//                 <img
//                   src="https://placehold.co/100x100/E0E7FF/4F46E5?text=Add"
//                   alt="add photos icon"
//                   className={`${styles.docGalleryImg} ${styles.addMoreGalleryImg}`}
//                 />
//                 <p className={styles.addMoreText}>Add more photos</p>
//                 <p
//                   className={styles.uploadInfo}
//                 >
//                   Upto 50 photos · Max size 10 MB · Formats: png, jpg, jpeg, gif,
//                   webp, heic, heif
//                 </p>
//                 <button className={styles.uploadPhotosBtn}>
//                   Upload Photos
//                 </button>
//               </div>
//             )}
//           </div>
//           {isProcessingImages && (
//             <div className={styles.loadingOverlay}>
//               <div className={styles.spinner}></div>
//               <p>Optimizing images...</p>
//             </div>
//           )}
//         </>
//       )}

//       {photos.length > 0 && photos.length < 5 && (
//         <div
//           className={`${styles.warningBox} ${styles.photoWarningBox} ${styles.mt4}`}
//         >
//           <p className={styles.warningText}>
//             Less photos added! Show your complete property by adding other area
//             photos too,e.g: Kitchen, balcony, etc{" "}
//             <span
//               className={`${styles.linkText} ${styles.addMoreLink}`}
//               onClick={handleAddMorePhotosClick}
//             >
//               Add more
//             </span>
//           </p>
//         </div>
//       )}

//       <div className={styles.mobileHelp}>
//         <p className={styles.mobileHelpTitle}>
//           Now you can also upload photos directly from your phone
//         </p>
//         <p className={`${styles.phone} ${styles.mobilePhoneNumber}`}>
//           With your registered number{" "}
//           <strong className={styles.phoneNumberValue}>+91-1234567890</strong>
//         </p>
//         <div className={`${styles.actions} ${styles.mobileUploadActions}`}>
//           <label
//             className={`${styles.radioLabel} ${styles.whatsappRadioLabel}`}
//           >
//             <input
//               type="radio"
//               name="uploadOption"
//               className={`${styles.radioInput} ${styles.whatsappRadioInput}`}
//             />
//             <img
//               src="https://placehold.co/24x24/075E54/FFFFFF?text=WA"
//               alt="whatsapp icon"
//               className={styles.whatsappIcon}
//             />{" "}
//             <span className={styles.radioOptionText}>
//               Send photos over WhatsApp
//             </span>
//           </label>

//           <label className={`${styles.radioLabel} ${styles.smsRadioLabel}`}>
//             <input
//               type="radio"
//               name="uploadOption"
//               className={`${styles.radioInput} ${styles.smsRadioInput}`}
//             />
//             <span className={styles.radioOptionText}>
//               📩 Get photo upload link over SMS
//             </span>
//           </label>
//         </div>
//       </div>

//       <button
//         className={styles.continueBtn}
//         onClick={handleContinue}
//       >
//         Continue
//       </button>

//       {/* फुल-स्क्रीन इमेज व्यूअर */}
//       {fullScreenImage && (
//         <div className={styles.fullScreenViewer}>
//           <button className={styles.closeButton} onClick={handleCloseFullScreen}>
//             <IoMdClose />
//           </button>
//           <img src={fullScreenImage} alt="Full Screen Preview" className={styles.fullScreenImage} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PhotoDetails;
