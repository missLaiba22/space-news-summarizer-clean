import React from 'react';
import styles from '../styles/ArticleCard.module.css';

const ArticleCard = ({ title, summary }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.summary}>{summary}</p>
    </div>
  );
};

export default ArticleCard;