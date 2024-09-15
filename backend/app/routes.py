# app/routes.py
from fastapi import APIRouter
from app.services import fetch_space_news, summarize_article
import logging

logging.basicConfig(level=logging.INFO)

router = APIRouter()


@router.get("/api/news")
async def get_space_news():
    logging.info("Fetching space news")

    """
    Fetches space-related news articles and returns them with a summary.
    """
    articles = fetch_space_news()
    # for article in articles:
    #   article['summary'] = summarize_article(article['content'])  # Summarize using the NLP model
    # return {"articles": articles}
    return articles


@router.get("/api/news/{article_id}")
async def get_article_summary(article_id: int):
    """
    Fetches the full summary of a specific article.
    """
    articles = fetch_space_news()
    article = next((article for article in articles if article['id'] == article_id), None)
    if article:
        return {"title": article['title'], "summary": article['summary']}
    return {"error": "Article not found"}
