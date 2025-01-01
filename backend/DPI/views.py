from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from authentication.Serialiezers import PatientSerializer, UserSerializer
from .Serializers import DpiSerializer
from shared_models.models import DossierPatient, Patient
from authentication.permission import UserAuthentication
import qrcode
import io
from django.core.files.base import ContentFile

class CreateDPIView(APIView):
    """
    Create a new DossierPatient record and associated Patient record.
    This view also validates the incoming data and generates a QR code.
    """
    serializer_class = DpiSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ensure only authenticated users can create a DPI

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Save the DPI record first
            dpi = serializer.save()

            # Extract patient data from the request
            patient_data = request.data.get("patient")
            if not patient_data:
                return Response({"error": "Patient data is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Validate and create the Patient record
            patient_serializer = PatientSerializer(data=patient_data)
            if patient_serializer.is_valid():
                patient = patient_serializer.save()

                # Generate the QR code for the patient
                qr_code_content = f"{patient.num_securite_sociale}-{patient.date_naissance}"
                qr = qrcode.QRCode(version=1, box_size=10, border=5)
                qr.add_data(qr_code_content)
                qr.make(fit=True)
                img = qr.make_image(fill="black", back_color="white")

                # Save the QR code image to the patient record
                buffer = io.BytesIO()
                img.save(buffer, format="PNG")
                patient.qr_code.save(f"{patient.num_securite_sociale}.png", ContentFile(buffer.getvalue()), save=True)

                return Response(
                    {"message": "DPI, Patient, and QR code created successfully!"},
                    status=status.HTTP_201_CREATED,
                )
            else:
                # Rollback DPI creation if patient creation fails
                dpi.delete()
                return Response(patient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        """
        List all DPI records. Only accessible to admins.
        """
        if not request.user.is_staff:
            return Response({"error": "Access denied."}, status=status.HTTP_403_FORBIDDEN)

        dpis = DossierPatient.objects.all()
        serializer = self.serializer_class(dpis, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ConsultPatientDPIView(APIView):
    """
    Retrieve the DPI associated with the authenticated patient.
    """
    authentication_classes = [UserAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            patient = Patient.objects.get(user=request.user)
            dpi = DossierPatient.objects.get(patient=patient)
            serializer = DpiSerializer(dpi)
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
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, nss, *args, **kwargs):
        try:
            dpi = DossierPatient.objects.get(patient__num_securite_sociale=nss)
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
