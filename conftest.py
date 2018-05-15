# conftest.py
import pytest
import os
from myapp import create_app, create_contentful
from dotenv import load_dotenv
import contentful_management
import time



load_dotenv()

SPACE_ID = os.getenv('SPACE_ID')
DELIVERY_API_KEY = os.getenv('DELIVERY_API_KEY')
MANGEMENT_API_KEY = os.getenv('MANGEMENT_API_KEY')

client = contentful_management.Client(MANGEMENT_API_KEY)

try:
    environment = client.environments(SPACE_ID).find('circle_testing')
    environment.delete()
except:
    print("circle_testing environment doesn't exist")

environment = client.environments(SPACE_ID).create(
    'circle_testing',
    {
        'name': 'circle_testing'
    }
)

environment.name = 'circle_testing'
time.sleep(5)


@pytest.fixture
def app():
    app = create_app(SPACE_ID, DELIVERY_API_KEY,environment_id='circle_testing')
    app.debug = True
    return app


@pytest.fixture
def contentful_client():
    contentful_client = create_contentful(SPACE_ID, DELIVERY_API_KEY,environment_id='circle_testing')
    return contentful_client
