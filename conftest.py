# conftest.py
import pytest
import os
from myapp import create_app, create_contentful
from dotenv import load_dotenv

load_dotenv()

SPACE_ID = os.getenv("SPACE_ID")
DELIVERY_API_KEY = os.getenv("DELIVERY_API_KEY")
TESTING_ENV = "circle_testing"


def pytest_addoption(parser):
    parser.addoption(
        "--environment-id",
        action="store",
        default="circle_testing",
        help="environment-id",
    )


@pytest.fixture
def get_env_id(request):
    return request.config.getoption("--environment-id")


@pytest.fixture
def app(get_env_id):
    app = create_app(SPACE_ID, DELIVERY_API_KEY, environment_id=get_env_id)
    app.debug = True
    return app


@pytest.fixture
def contentful_client(get_env_id):
    contentful_client = create_contentful(
        SPACE_ID, DELIVERY_API_KEY, environment_id=get_env_id
    )
    return contentful_client
