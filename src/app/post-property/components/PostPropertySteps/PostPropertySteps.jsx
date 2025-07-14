import styles from './PostPropertySteps.module.css';
import Image from 'next/image';

export default function PostPropertySteps() {
  const steps = [
    {
      id: '01',
      title: 'Add details of your property',
      desc: 'Begin by telling us the few basic details about your property like your property type, location, No. of rooms etc',
      icon: '/doc-detail.png', 
    },
    {
      id: '02',
      title: 'Upload Photos & Videos',
      desc: 'Upload photos and videos of your property either via your desktop device or from your mobile phone',
      icon: '/doc-gallery.png',
    },
    {
      id: '03',
      title: 'Add Pricing & Ownership',
      desc: 'Just update your property’s ownership details and your expected price and your property is ready for posting',
      icon: '/doc-home.png',
    },
  ];

  return (
    <section className={styles.stepsSection}>
      <p className={styles.howToPost}>HOW TO POST</p>
      <h1 className={styles.postHeading}>Post Your Property in<br />3 Simple Steps</h1>

      <div className={styles.stepsContainer}>
        {steps.map((step) => (
          <div className={styles.stepCard} key={step.id}>
            <Image
              src={step.icon}
              alt={step.title}
              width={60}
              height={60}
              className={styles.stepIcon}
            />
            <h3 className={styles.stepTitle}>
              <span className={styles.stepNumber}>{step.id}. </span>
              {step.title}
            </h3>
            <p className={styles.stepDesc}>{step.desc}</p>
          </div>
        ))}
      </div>

      <button className={styles.ctaButton}>Begin to Post your Property</button>
    </section>
  );
}
