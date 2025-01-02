from rest_framework import serializers
from shared_models.models import Ordonnance, Medicament

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'

class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = MedicamentSerializer(many=True)  # Serialize related medicaments

    class Meta:
        model = Ordonnance
        fields = '__all__'
