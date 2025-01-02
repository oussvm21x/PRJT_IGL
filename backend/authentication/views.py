from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .Serialiezers import UserSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .services import create_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from shared_models import *

User = get_user_model()

class CreateListUsersView(APIView):
    serializer_class = UserSerializer

    def get_permissions(self):
        return super().get_permissions()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)
    



class RetrieveUserView(APIView):
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id', None)
        
        try:
            user = User.objects.get(id=user_id)
            serializer = self.serializer_class(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
     
    def delete(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id', None)  
        try:
            user = User.objects.get(id=user_id)
            if user.role == 'admin':  
                return Response({"error": "You cannot delete another admin."}, status=status.HTTP_403_FORBIDDEN)
            user.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class UserLoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            # Authenticate the user
            user = authenticate(username=username, password=password)
            if user:
                # Generate the JWT token using simplejwt's TokenObtainPairView
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                # Serialize the user object
                user_serializer = UserSerializer(user)

                # Return access token, refresh token, and user object
                return Response(
                    {
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "user": user_serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserLogoutView(APIView):
    
    def post(self, request, *args, **kwargs):
        try:
            # Get the refresh token from the request data
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Blacklist the token
            token = RefreshToken(refresh_token)
            # Blacklisting the refresh token
            token.blacklist()

            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": "Invalid token or logout failed"}, status=status.HTTP_400_BAD_REQUEST)