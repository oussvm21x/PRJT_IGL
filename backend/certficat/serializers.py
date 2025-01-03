from rest_framework import serializers
from shared_models.models import CertificatMedical

class CertificatMedicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificatMedical
        fields = [
            'id_certificat',
            'date_emission',
            'motif',
            'duree_arret',
            'patient',
            'auteur',
        ]
        read_only_fields = ['id_certificat', 'date_emission']
