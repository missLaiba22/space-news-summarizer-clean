import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';g
import styles from '../styles/Articles.module.css';

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.heading}>Latest Space News</h1>
        <div className={styles.articleGrid}>
          {articles.map((article, index) => (
            <div key={index} className={styles.articleCard}>
              <img src={article.thumbnail} alt={article.title} className={styles.thumbnail} />
              <h2 className={styles.title}>{article.title}</h2>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                Read Full Article
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
