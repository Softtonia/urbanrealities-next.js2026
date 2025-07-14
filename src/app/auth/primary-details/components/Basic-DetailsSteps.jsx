"use client"
import styles from './Basic-DetailsSteps.module.css';
import { useState } from 'react';

export default function StepContent() {
  const [selectedPurpose, setSelectedPurpose] = useState('Sell');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Residential');
  const [selectedCategory, setSelectedCategory] = useState('');

  const purposes = ['Sell', 'Rent / Lease', 'PG'];
  const categories = [
    'Flat/Apartment',
    'Independent House / Villa',
    'Independent / Builder Floor',
    'Plot / Land',
    '1 RK/ Studio Apartment',
    'Serviced Apartment',
    'Farmhouse',
    'Other',
  ];

  return (
    <div className={styles.content}>
      <h2>Welcome back manmeet,</h2>
      <h3>Fill out basic details</h3>

      <div className={styles.optionGroup}>
        <p>I'm looking to</p>
        <div className={styles.optionButtons}>
          {purposes.map((p) => (
            <button
              key={p}
              className={`${styles.optionBtn} ${selectedPurpose === p ? styles.selected : ''}`}
              onClick={() => setSelectedPurpose(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.optionGroup}>
        <p>What kind of property do you have?</p>
        <div className={styles.optionButtons}>
          {['Residential', 'Commercial'].map((type) => (
            <button
              key={type}
              className={`${styles.optionBtn} ${selectedPropertyType === type ? styles.selected : ''}`}
              onClick={() => setSelectedPropertyType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.optionButtons}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.optionBtn} ${selectedCategory === cat ? styles.selected : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <button className={styles.continueBtn}>Continue</button>
    </div>
  );
}
