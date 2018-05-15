# conftest.py
import pytest
import os
from myapp import create_app, create_contentful
from dotenv import load_dotenv

load_dotenv()

SPACE_ID = os.getenv('SPACE_ID')
DELIVERY_API_KEY = os.getenv('DELIVERY_API_KEY')

@pytest.fixture
def app():
    app = create_app(SPACE_ID, DELIVERY_API_KEY)
    app.debug = True
    return app


@pytest.fixture
def contentful_client():
    contentful_client = create_contentful(SPACE_ID, DELIVERY_API_KEY)
    return contentful_client
