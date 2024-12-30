import jwt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .Serialiezers import LoginSerializer, UserSerializer
from shared_models.models import User
from django.conf import settings


def create_token(user: "User") -> str:
    """
    Generates JWT access token.
    """
    payload = {
        "id": user.id,
        "role": user.role,
        
    }
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")
    return token