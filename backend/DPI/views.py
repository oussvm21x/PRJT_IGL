from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from authentication.Serialiezers import PatientSerializer, UserSerializer
from .Serializers import DpiSerializer
from shared_models.models import DossierPatient, Patient, Medecin , User
from authentication.permission import UserAuthentication
import qrcode
import io
from django.core.files.base import ContentFile
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken
import jwt
from django.conf import settings


class CreateDPIView(APIView):
    """
    Create a new DossierPatient (DPI) and associated Patient using provided data.
    """
    serializer_class = DpiSerializer  # Add this line to define the serializer
    def get_user_from_token(self, token):
        """
        Manually extract user from token
        """
        try:
            # Decode the token
            decoded_token = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            user_id = decoded_token.get("user_id")
            if not user_id:
                raise InvalidToken("User ID not found in token")
            
            # Get the user
            user = User.objects.get(id=user_id)
            return user
        except jwt.ExpiredSignatureError:
            raise InvalidToken("Token has expired")
        except jwt.InvalidTokenError:
            raise InvalidToken("Invalid token")

    def post(self, request, *args, **kwargs):
        print("I was here at post")
        # Extract patient data from the request
        patient_data = request.data.get("patient")
        if not patient_data:
            return Response({"error": "Patient data is required."}, status=status.HTTP_400_BAD_REQUEST)

        nss = patient_data.get("num_securite_sociale")
        if not nss:
            return Response({"error": "Patient NSS is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if patient already exists based on NSS
        patient = Patient.objects.filter(num_securite_sociale=nss).first()

        if not patient:
            # If patient does not exist, create a new one
            patient_serializer = PatientSerializer(data=patient_data)
            if patient_serializer.is_valid():
                patient = patient_serializer.save()
            else:
                return Response(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Extract other DPI data
        dpi_data = {
            "id_dossier": request.data.get("id_dossier"),
            "date_ouverture": request.data.get("date_ouverture"),
            "antecedents": request.data.get("antecedents", []),
            "patient": patient.id,  # Link created or existing patient
        }

        # Create the DossierPatient instance
        dpi_serializer = DpiSerializer(data=dpi_data)
        if dpi_serializer.is_valid():
            dpi = dpi_serializer.save()

            # Return success response
            return Response({
                "message": "Dossier Patient and Patient created successfully!",
                "dpi_id": dpi.id,
                "patient_id": patient.num_securite_sociale,
            }, status=status.HTTP_201_CREATED)

        return Response(dpi_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, *args, **kwargs):
        print("I was here")
        """
        List all DPI records. Only accessible to admins.
        """
        auth_header = request.headers.get('Authorization')
        print(auth_header)
        if auth_header:
            try: 
                token = auth_header.split(' ')[1]  # Get the token part
                print(token)
                UntypedToken(token)  # Validate token (throws error if invalid)
                print(token)
                request.user = self.get_user_from_token(token)  # Manually set user if token is valid
                
            except InvalidToken:
                return Response({"error": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "Authorization header missing."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Uncomment this to check if the user is an admin
        # if not request.user.is_staff:
        #     return Response({"error": "Access denied."}, status=status.HTTP_403_FORBIDDEN)
        
        dpis = DossierPatient.objects.all()
        serializer = self.serializer_class(dpis, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ConsultPatientDPIView(APIView):
    """
    Retrieve the DPI associated with the authenticated patient.
    """
    serializer_class = DpiSerializer  # Add this line to define the serializer
    
    def get_user_from_token(self, token):
        """
        Manually extract user from token
        """
        try:
            # Decode the token
            decoded_token = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            user_id = decoded_token.get("user_id")
            print(user_id)
            if not user_id:
                raise InvalidToken("User ID not found in token")
            
            # Get the user
            return user_id
        except jwt.ExpiredSignatureError:
            raise InvalidToken("Token has expired")
        except jwt.InvalidTokenError:
            raise InvalidToken("Invalid token")

    def get(self, request, *args, **kwargs):
        """
        Retrieve the DPI associated with the authenticated patient.
        """
        # Extract token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return Response({"error": "Authorization header missing."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token = auth_header.split(' ')[1]  # Get the token part

            user_id = self.get_user_from_token(token)  # Validate token (throws error if invalid)
        except InvalidToken:
            return Response({"error": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            # Retrieve the patient associated with the user
            patient = Patient.objects.get(user__id=user_id)
            dpi = DossierPatient.objects.get(patient=patient)
            serializer = self.serializer_class(dpi)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response(
                {"error": "You do not have a patient profile."},
                status=status.HTTP_403_FORBIDDEN
            )
        except DossierPatient.DoesNotExist:
            return Response(
                {"error": "No DPI record found for this patient."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "Internal server error."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class SearchDPIByNSSView(APIView):
    """
    Search for a DPI record using an NSS (social security number).
    """

    def get(self, request, nss, *args, **kwargs):
        try:
            patient = Patient.objects.get(num_securite_sociale=nss)
            print(patient)
            dpi = DossierPatient.objects.get(patient=patient)
            serializer = DpiSerializer(dpi)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DossierPatient.DoesNotExist:
            return Response(
                {"error": "No DPI record found with this NSS."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"Internal server error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
