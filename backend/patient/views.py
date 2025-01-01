from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from shared_models.models import Patient
from .serializers import PatientSerializer
from rest_framework import status
from rest_framework.exceptions import NotFound

# Create a new patient
class CreatePatientView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

# Get patient details
class GetPatientDetailsView(generics.RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    lookup_field = 'num_securite_sociale'  # NSS field

class PatientByNSSView(APIView):
    def get(self, request, nss):
        try:
            patient = Patient.objects.get(num_securite_sociale=nss)
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)


class SearchPatientByQRCode(APIView):
    def post(self, request):
        """
        Handle the scanned QR code content to search for a patient.
        The request should include the QR code data as a plain string.
        """
        qr_code_content = request.data.get("qr_code_content")  # Example: "123456789012-1990-01-01"
        if not qr_code_content:
            return Response({"error": "QR code content is missing."}, status=400)

        try:
            # Extract NSS and Date of Birth from the QR code content
            nss, date_of_birth = qr_code_content.split("-")

            # Query the database for a matching patient
            patient = Patient.objects.get(num_securite_sociale=nss, date_naissance=date_of_birth)
            serializer = PatientSerializer(patient)
            return Response(serializer.data)

        except Patient.DoesNotExist:
            raise NotFound({"error": "No patient found with the provided QR code data."})
        except ValueError:
            return Response({"error": "Invalid QR code format."}, status=400)