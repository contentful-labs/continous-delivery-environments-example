# conftest.py
import pytest

from myapp import create_app, create_contentful


@pytest.fixture
def app():
    app = create_app()
    app.debug = True
    return app


@pytest.fixture
def contentful_client():
    contentful_client = create_contentful()
    return contentful_client
