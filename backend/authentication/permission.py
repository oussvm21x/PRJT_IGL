from rest_framework.permissions import BasePermission
from django.conf import settings
from rest_framework import authentication, exceptions
import jwt
from shared_models.models import User


class UserAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get("Authorization")

        if not token:
            raise exceptions.AuthenticationFailed("Missing authentication token")

        if not token.startswith("Bearer "):
            raise exceptions.AuthenticationFailed("Invalid authentication token")
        
        token = token.replace("Bearer ", "")

        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed("Invalid token")
        
        user = User.objects.filter(id=payload.get("id")).first()
        if not user:
            raise exceptions.AuthenticationFailed("User not found")

        return (user, None)
    
    
class IsAdmin(BasePermission):
    """
    Custom permission to allow access only to users with the 'admin' role.
    """

    def has_permission(self, request, view):
        if not hasattr(request, "user") or request.user.is_anonymous:
            return False

        return request.user.role == "admin"

class IsPatient(BasePermission):
    """
    Custom permission to allow access only to users with the 'admin' role.
    """

    def has_permission(self, request, view):
        # Ensure the request has a user object
        if not hasattr(request, "user") or request.user.is_anonymous:
            return False

        # Check if the user's role is 'admin'
        return request.user.role == "patient"
