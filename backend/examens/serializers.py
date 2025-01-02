from rest_framework import serializers
from shared_models.models import ExamenBiologique , ExamenRadiologique

class ExamenBiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenBiologique
        fields = ['parameters', 'values', 'graphique_tendance', 'examen', 'laborantien']
class ExamenRadiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenRadiologique
        fields = ['type_image', 'fichier_image', 'compte_rendu', 'examen', 'radiologue']
