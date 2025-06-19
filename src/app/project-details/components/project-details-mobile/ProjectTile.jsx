import React from 'react';
import styles from './ProjectTile.module.css';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { MdBookmark } from "react-icons/md";

const ProjectTile = ({
    imageUrl,
  price,
  rating,
  bhk,
  type,
  size,
  location,
  projectName,
  availableFor,
  carpetArea,
}) => {
  return (
        <div className={styles.card}>
      <div className={styles.badge}>Featured</div>

      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={projectName}
          width={336}
          height={168}
          className={styles.image}
        />
        <MdBookmark className={styles.bookmark}/>
      </div>

      <div className={styles.content}>
        <div className={styles.priceRow}>
          <span className={styles.price}>{price}</span>
          <span className={styles.rating}>{rating} <FaStar className={styles.star} /></span>
        </div>
        <p className={styles.details}>{bhk} &nbsp;&nbsp; {type} {size}</p>
        <p className={styles.location}>{location} <span className={styles.projectName}>{projectName}</span></p>
        <p className={styles.availableFor}>Available for<span className={styles.Fordata}>{availableFor} </span> </p>
        <p className={styles.carpetArea}>Carpet Area <span className={styles.Areadata}> {carpetArea} </span></p>
        <button className={styles.moreBtn}>More Details</button>
      </div>
    </div>
  );
}

export default ProjectTile;

