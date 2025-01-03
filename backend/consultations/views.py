from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import api_view
from .serializers import ConsultationSerializer
from shared_models.models import Examen, Patient, Medecin, Consultation , DossierPatient , Resume
import uuid
from datetime import date


class CreateConsultationView(APIView):
    def post(self, request, patient_nss, doctor_id):
        """
        Creates a consultation for a patient with a given doctor and updates the patient's dossier.
        """
        # Validate and retrieve the Medecin instance
        doctor = get_object_or_404(Medecin, id_medecin=doctor_id)
        
        # Validate and retrieve the Patient instance
        patient = get_object_or_404(Patient, num_securite_sociale=patient_nss)
        
        # Extract data from the request body
        data = request.data
        motif = data.get("motif")
        observations = data.get("observations")
        resume_data = data.get("resume", {})
        examens = data.get("examens",[])
        # Validation for required fields
        if not motif or not observations:
            return Response(
                {"error": "Both 'motif' and 'observations' are required fields."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create a Resume entry if provided
        resume = None
        if resume_data:
            resume = Resume.objects.create(
                id_resume=Resume.objects.count(),
                date=date.today(),
                contenu=resume_data.get("contenu", ""),
                antecedents=resume_data.get("antecedents", []),
                auteur=doctor,
                patient=patient,
            )
        else :
            resume = Resume.objects.create(
                id_resume=Resume.objects.count(),
                date=date.today(),
                contenu="NOT GIVEN",
                antecedents=[],
                auteur=doctor,
                patient=patient,
            )
        # Retrieve or create the DossierPatient entry
        dossier, created = DossierPatient.objects.get_or_create(patient=patient)    
        # Create a Consultation entry
        consultation = Consultation.objects.create (
            # Add the consultation to the dossier
            id_consultation = dossier.consultations.count() + 1 ,
            date=date.today(),
            motif=motif,
            observations=observations,
            resume=resume,
        )

        

        
        dossier.consultations.add(consultation)
        
        dossier.save()
        
        # If there are any examens, add them to the consultation
        if examens:
            examen_objects = Examen.objects.filter(id_examen__in=examens)
            consultation.examens.add(*examen_objects)
            consultation.save()

        # Return a success response
        return Response(
            {
                "message": "Consultation created successfully",
                "consultation_id": consultation.id_consultation,
                "patient": {
                    "num_securite_sociale": patient.num_securite_sociale,
                    "nom": patient.nom,
                    "prenom": patient.prenom,
                },
                "doctor": {
                    "id_medecin": doctor.id_medecin,
                    "nom": doctor.nom,
                    "prenom": doctor.prenom,
                    "specialite": doctor.specialite,
                },
                "dossier": {
                    "id": dossier.id,
                    "consultations_count": dossier.consultations.count(),
                },
            },
            status=status.HTTP_201_CREATED,
        )

    
class ListPatientConsultations(APIView) :
    def get(self, request, patient_nss):
        # Get the patient using the num_securite_sociale
        patient = get_object_or_404(Patient, num_securite_sociale=patient_nss)
        
        # Find all the DossierPatient instances associated with the patient
        dossier = get_object_or_404(DossierPatient, patient=patient)
        
        # Filter consultations by the patient through the dossier
        consultations = dossier.consultations.all()
        
        
        # Serialize the consultations
        serializer = ConsultationSerializer(consultations, many=True)        
        return Response(serializer.data)
    
class ListDoctorConsultations(APIView):
    def get(self, request, doctor_id):
        # Get the doctor using the ID
        doctor = get_object_or_404(Medecin, id_medecin=doctor_id)
        
        # Find all consultations associated with the doctor via Resume
        consultations = Consultation.objects.filter(resume__auteur=doctor)
        
        # Serialize the consultations
        serializer = ConsultationSerializer(consultations, many=True)
        return Response(serializer.data)





class ConsultationDetail(APIView):
    def get(self, request, consultation_id):
        consultation = get_object_or_404(Consultation, id_consultation=consultation_id)
        serializer = ConsultationSerializer(consultation)
        return Response(serializer.data)
