from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from datetime import date
import uuid
from shared_models.models import DossierPatient

from shared_models.models import CertificatMedical, Patient, Medecin
from .serializers import CertificatMedicalSerializer


class RequestMedicalCertificateView(APIView):
    """
    Handles medical certificate requests for a patient.
    """
    def post(self, request, nss):
        # Retrieve the patient by NSS
        patient = get_object_or_404(Patient, num_securite_sociale=nss)

        # Extract data from the request body
        data = request.data
        motif = data.get("motif")
        duree_arret = data.get("duree_arret")
        auteur_id = data.get("auteur_id")  # ID of the doctor creating the certificate

        # Validation: Ensure all required fields are provided
        if not motif or not duree_arret or not auteur_id:
            return Response(
                {"error": "Fields 'motif', 'duree_arret', and 'auteur_id' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Retrieve the doctor (Medecin) instance
        auteur = get_object_or_404(Medecin, id_medecin=auteur_id)

        # Generate a unique ID for the certificate
        id_certificat = CertificatMedical.objects.count() + 1
        # Create the certificate
        certificat = CertificatMedical.objects.create(
            id_certificat=id_certificat,
            date_emission=date.today(),
            motif=motif,
            duree_arret=duree_arret,
            patient=patient,
            auteur=auteur,
        )
        dpi = DossierPatient.objects.get(patient=patient)
        dpi.certificats_medicaux.add(certificat)

        # Serialize and return the created certificate
        serializer = CertificatMedicalSerializer(certificat)
        return Response(
            {"message": "Medical certificate created successfully", "certificate": serializer.data},
            status=status.HTTP_201_CREATED,
        )
