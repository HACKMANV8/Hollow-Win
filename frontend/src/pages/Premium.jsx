import React from 'react';
import { FiCheck, FiChevronRight } from 'react-icons/fi';
import styles from './Premium.module.css';

const features = [
  'Unlimited access to all stories',
  'Ad-free experience',
  'Download for offline reading',
  'Exclusive content',
  'Priority customer support'
];

const benefits = [
  {
    icon: '📚',
    title: 'Unlimited Stories',
    description: 'Access our entire library of stories anytime, anywhere.'
  },
  {
    icon: '🎧',
    title: 'Audio Narration',
    description: 'Professional voice actors bring stories to life.'
  },
  {
    icon: '📱',
    title: 'Offline Access',
    description: 'Download and enjoy stories without an internet connection.'
  }
];

export default function Premium() {
  return (
    <div className={styles.premiumPage}>
      <div className={styles.hero}>
        <h1>Unlock Premium Features</h1>
        <p>Get access to all premium content, including exclusive stories, ad-free experience, and more.</p>
      </div>

      <div className={styles.pricingCard}>
        <div className={styles.pricingHeader}>
          <h2>Premium Plan</h2>
          <div className={styles.price}>$9.99<span>/month</span></div>
          <p>Billed monthly. Cancel anytime.</p>
        </div>
        
        <ul className={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <FiCheck className={styles.checkIcon} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <button className={styles.ctaButton}>
          Get Started
          <FiChevronRight className={styles.arrowIcon} />
        </button>
        
        <p className={styles.note}>7-day free trial. No credit card required.</p>
      </div>
      
      <div className={styles.additionalInfo}>
        <h3>Why go Premium?</h3>
        <p>Our premium members enjoy an enhanced experience with no interruptions and exclusive access to new features.</p>
        
        <div className={styles.benefits}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitItem}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


