# app/services.py
import requests
from bs4 import BeautifulSoup
from transformers import pipeline

NEWS_API_URL = "https://newsapi.org"  # Replace with the actual API URL
API_KEY = "f51d7247dc1a4582be7a64f367e0e16a"


def fetch_space_news():
    """
    Fetches space-related news articles from an external API.
    """
    url = f"{NEWS_API_URL}/v2/everything?q=space&apiKey={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        articles = response.json()['articles']
        parsed_articles = []
        for idx, article in enumerate(articles):
            parsed_articles.append({
                "id": idx,
                "title": article['title'],
                "content": article['content'],
                "url": article['url'],
                "thumbnail": article['urlToImage'] or "",  # Thumbnail URL
                "publishedAt": article['publishedAt']
            })
        return parsed_articles
    return []


summarizer = pipeline("summarization", model="facebook/bart-large-cnn")


def summarize_article(content):
    """
    Summarizes the article content using a pre-trained BART model (abstractive summarization).
    """
    if content:
        # Adjust max_length dynamically based on input length
        input_length = len(content.split())

        # Calculate max_length as 75% of input length, capped at 150 tokens
        max_length = min(150, int(input_length * 0.75))  

        # Calculate min_length as 30% of input length, capped at 40 tokens
        min_length = min(40, int(input_length * 0.3))    

        # Ensure max_length > min_length to avoid errors
        if max_length <= min_length:
            max_length = min_length + 10  # Ensure there's a margin between max and min length

        try:
            # Summarize the content with Hugging Face's BART model
            summary = summarizer(content[:1024], max_length=max_length, min_length=min_length, do_sample=False)
            return summary[0]['summary_text']
        except Exception as e:
            print(f"Error summarizing content: {e}")
            return "An error occurred while summarizing the content."
    
    return "No content available for summarization."
