from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['space_news_db']


def save_article(article):
    db.articles.insert_one(article)

