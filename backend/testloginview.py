import pytest
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
class TestUserLoginView:
    @pytest.fixture
    def create_user(self):
        """Fixture to create a test user"""
        user = User.objects.create_user(username='test', password='testpassword', role='patient')
        return user

    @pytest.fixture
    def client(self):
        """Fixture to create an APIClient instance"""
        return APIClient()

    def test_user_login_success(self, client, create_user):
        """Test successful user login"""
        login_data = {
            "username": "test",
            "password": "testpassword"
        }

        # Make the post request to the login view
        response = client.post('http://127.0.0.1:8000/auth/login', login_data, format='json')

        # Check for successful response and that tokens are returned
        assert response.status_code == status.HTTP_200_OK
        assert 'access_token' in response.data
        assert 'refresh_token' in response.data
        assert response.data['user']['username'] == 'test'
        assert response.data['user']['role'] == 'patient'

    def test_user_login_invalid_credentials(self, client):
        """Test invalid user login (wrong credentials)"""
        login_data = {
            "username": "wronguser",
            "password": "wrongpassword"
        }

        # Make the post request to the login view with invalid credentials
        response = client.post('http://127.0.0.1:8000/auth/login', login_data, format='json')

        # Check for unauthorized response
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert 'error' in response.data
        assert response.data['error'] == 'Invalid credentials'

    def test_user_login_missing_field(self, client):
        """Test login with missing fields"""
        login_data = {
            "username": "testuser"
            # Missing password field
        }

        # Make the post request with missing field
        response = client.post('http://127.0.0.1:8000/auth/login', login_data, format='json')

        # Check for bad request response
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'password' in response.data
