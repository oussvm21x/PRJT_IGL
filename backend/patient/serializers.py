from rest_framework import serializers
from shared_models.models import Patient, Medecin

class MedecinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecin
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    medecins_traitants = MedecinSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = '__all__'
