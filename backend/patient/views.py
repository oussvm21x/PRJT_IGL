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
    def get(self, request, qr_code, *args, **kwargs):
        # Your logic to handle the qr_code
        values = qr_code.split(":")
        nss = values[0]
        date_naissance = values[1]
        # Query the database for a matching patient
        patient = Patient.objects.get(num_securite_sociale=nss, date_naissance=date_naissance)
        serializer = PatientSerializer(patient)
        return Response(serializer.data)