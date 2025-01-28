import pytest
from rest_framework import status
from rest_framework.test import APIClient
from shared_models.models import Patient
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    return User.objects.create_user(username="testuser", password="testpassword")

@pytest.mark.django_db
def test_create_patient_missing_required_field(api_client, create_user):
    # Attempt to create a patient without required fields
    invalid_data = {
        "user": create_user.id,
        "nom": "Doe",
        "prenom": "John",
        # "num_securite_sociale" is missing
        "date_naissance": "1990-01-01",
        "adresse": "123 Street",
    }
    response = api_client.post("/patient/", data=invalid_data, format="json")

    # Validate response
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "num_securite_sociale" in response.data
    assert response.data["num_securite_sociale"][0] == "This field is required."

@pytest.mark.django_db
def test_create_patient_invalid_date(api_client, create_user):
    # Attempt to create a patient with an invalid date format
    invalid_data = {
        "user": create_user.id,
        "nom": "Doe",
        "prenom": "Jane",
        "num_securite_sociale": "9127",
        "date_naissance": "invalid-date",
        "adresse": "456 Avenue",
    }
    response = api_client.post("/patient/", data=invalid_data, format="json")

    # Validate response
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "date_naissance" in response.data
    assert response.data["date_naissance"][0].startswith("Date has wrong format")


@pytest.mark.django_db
def test_create_patient_missing_all_fields(api_client):
    # Attempt to create a patient with an empty payload
    response = api_client.post("/patient/", data={}, format="json")

    # Validate response
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "num_securite_sociale" in response.data
    assert "nom" in response.data
    assert "prenom" in response.data
    assert response.data["num_securite_sociale"][0] == "This field is required."
    assert response.data["nom"][0] == "This field is required."
    assert response.data["prenom"][0] == "This field is required."
