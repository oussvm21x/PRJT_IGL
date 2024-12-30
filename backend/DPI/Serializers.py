from rest_framework import serializers
from django.db import transaction
from shared_models.models import DossierPatient, Patient, User, Consultation, CertificatMedical

class DpiSerializer(serializers.ModelSerializer):
    class Meta:
        model = DossierPatient
        fields = '__all__'

    def create(self, validated_data):
        # Extract fields from validated data
        antecedents = validated_data.pop('antecedents', [])
        consultations = validated_data.pop('consultations', [])
        certificats_medicaux = validated_data.pop('certificats_medicaux', [])
        patient_data = validated_data.pop('patient', None)

        try:
            with transaction.atomic():
                # Create or retrieve patient
                patient = patient_data
                if not patient:
                    raise serializers.ValidationError({"patient": "Patient data is required."})

                # Create the DossierPatient
                dpi = DossierPatient.objects.create(
                    patient=patient,
                    antecedents=antecedents,
                    **validated_data
                )

                # Add ManyToMany relationships
                dpi.consultations.set(consultations)
                dpi.certificats_medicaux.set(certificats_medicaux)

                return dpi

        except Exception as e:
            raise serializers.ValidationError({
                "error": f"Failed to create DossierPatient: {str(e)}"
            })
