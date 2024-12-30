from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .Serialiezers import UserSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .services import create_token

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
                # Generate the JWT token
                token = create_token(user)

                # Serialize the user object
                user_serializer = UserSerializer(user)

                # Return token and user object in response
                return Response(
                    {
                        "token": token,
                        "user": user_serializer.data,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
