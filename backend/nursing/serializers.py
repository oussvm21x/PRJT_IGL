from rest_framework import serializers
from shared_models.models import Soin, Medicament, Infirmier, Patient, User

# Serializer for Medicament
class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = ['id', 'nom', 'dosage', 'voie_administration']

# Serializer for Infirmier (Nurse)
class InfirmierSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Make sure the user field is included

    class Meta:
        model = Infirmier
        fields = ['id', 'nom', 'prenom', 'user']  # Include 'user' field here


# Serializer for Patient
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['num_securite_sociale', 'nom', 'prenom', 'date_naissance', 'adresse', 'telephone', 'email', 'medecins_traitants']

# Serializer for Soin (Care Activity)
class SoinSerializer(serializers.ModelSerializer):
    medicaments_administres = MedicamentSerializer(many=True)
    infirmier = InfirmierSerializer()
    patient = PatientSerializer()

    class Meta:
        model = Soin
        fields = ['id_soin', 'date', 'description', 'medicaments_administres', 'infirmier', 'observations', 'patient']

    def create(self, validated_data):
        medicaments_data = validated_data.pop('medicaments_administres')
        infirmier_data = validated_data.pop('infirmier')
        patient_data = validated_data.pop('patient')

        infirmier = Infirmier.objects.get(id_infirmier=infirmier_data['id_infirmier'])
        patient = Patient.objects.get(num_securite_sociale=patient_data['num_securite_sociale'])
        medicaments = [Medicament.objects.get(id=medicament_data['id']) for medicament_data in medicaments_data]

        soin = Soin.objects.create(
            date=validated_data['date'],
            description=validated_data['description'],
            infirmier=infirmier,
            observations=validated_data['observations'],
            patient=patient
        )

        soin.medicaments_administres.set(medicaments)  # Link medicaments
        return soin
