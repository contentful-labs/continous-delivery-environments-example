# Basic Tests for the application
import pytest
import json
from flask import url_for


class TestApp:

    def test_ping(self, client):
        """Test server responds"""
        res = client.get(url_for("ping"))
        assert res.status_code == 200
        assert res.json == {"ping": "pong"}

    def test_content_type_post(self, contentful_client):
        """Test content model of a procedure"""
        post_content_type = contentful_client.content_type("procedure")
        title = next(d for d in post_content_type.fields if d.id == "title")
        assert title.id == "title"
        assert title.type == "Symbol"
