import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import AnimatedStars from '../components/AnimatedStars';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout
  
        const response = await fetch('/api/news', { signal: controller.signal });
        clearTimeout(timeoutId);
        const data = await response.json();
        console.log(data);  // Debug the response
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('Fetch request timed out');
        } else {
          console.error('Error fetching news:', error);
        }
      }
    };
    fetchArticles();
  }, []);
  

  return (
    <div className={styles.container}>
      <AnimatedStars /> {/* Ensure AnimatedStars is rendered here at the top */}
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.heading}>Space News Summarizer</h1>
        <div className={styles.newsFeed}>
          {Array.isArray(articles) && articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                summary={article.summary}
              />
            ))
          ) : (
            <p className={styles.paragraph}>No articles found</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
