import random
from datetime import datetime, timedelta
from faker import Faker
from django.core.management.base import BaseCommand
from shared_models.models import (
    Medecin, Patient, Resume, Examen, Medicament, Infirmier, Soin,
    Consultation, CertificatMedical, DossierPatient, Ordonnance, CompteRendu,
    ExamenRadiologique, ExamenBiologique, Radiologue, Laborantien, Administratif
)

fake = Faker()

class Command(BaseCommand):
    help = "Populate the database with mock data"

    def handle(self, *args, **kwargs):
        # Create Medecins
        medecins = [
            Medecin.objects.create(
                id_medecin=f"MED-{i+1}",
                nom=fake.last_name(),
                prenom=fake.first_name(),
                specialite=fake.job()
            ) for i in range(5)
        ]

        # Create Patients
        patients = [
            Patient.objects.create(
                num_securite_sociale=f"SS-{i+1}",
                nom=fake.last_name(),
                prenom=fake.first_name(),
                date_naissance=fake.date_of_birth(),
                adresse=fake.address(),
                telephone=fake.phone_number(),
                email=fake.email(),
                personne_contact=fake.name()
            ) for i in range(10)
        ]

        # Add Medecins to Patients
        for patient in patients:
            patient.medecins_traitants.add(random.choice(medecins))

        # Create Resumes
        resumes = [
            Resume.objects.create(
                id_resume=f"RES-{i+1}",
                date=fake.date_this_year(),
                contenu=fake.text(),
                antecedents={"conditions": fake.words(nb=3)},
                auteur=random.choice(medecins),
                patient=random.choice(patients)
            ) for i in range(10)
        ]

        # Create Examens
        examens = [
            Examen.objects.create(
                id_examen=f"EX-{i+1}",
                type=fake.word(),
                date=fake.date_this_year(),
                resultat=fake.text(),
                patient=random.choice(patients)
            ) for i in range(10)
        ]

        # Create Medicaments
        medicaments = [
            Medicament.objects.create(
                nom=fake.word(),
                dosage=f"{random.randint(1, 100)}mg",
                voie_administration=fake.word()
            ) for _ in range(10)
        ]

        # Create Infirmiers
        infirmiers = [
            Infirmier.objects.create(
                id_infirmier=f"INF-{i+1}",
                nom=fake.last_name(),
                prenom=fake.first_name()
            ) for i in range(5)
        ]

        # Create Soins
        soins = [
            Soin.objects.create(
                id_soin=f"SO-{i+1}",
                date=fake.date_this_year(),
                description=fake.text(),
                infirmier=random.choice(infirmiers),
                observations=fake.text(),
                patient=random.choice(patients)
            ) for i in range(10)
        ]
        for soin in soins:
            soin.medicaments_administres.add(random.choice(medicaments))

        # Create Consultations
        consultations = [
            Consultation.objects.create(
                id_consultation=f"CONS-{i+1}",
                date=fake.date_this_year(),
                motif=fake.text(),
                observations=fake.text(),
                resume=random.choice(resumes)
            ) for i in range(10)
        ]
        for consultation in consultations:
            consultation.soins.add(random.choice(soins))
            consultation.examens.add(random.choice(examens))

        # Create CertificatMedicals
        certificats = [
            CertificatMedical.objects.create(
                id_certificat=f"CERT-{i+1}",
                date_emission=fake.date_this_year(),
                motif=fake.text(),
                duree_arret=f"{random.randint(1, 14)} days",
                patient=random.choice(patients),
                auteur=random.choice(medecins)
            ) for i in range(5)
        ]

        # Create DossierPatients
        for patient in patients:
            dossier = DossierPatient.objects.create(
                id_dossier=f"DOS-{patient.num_securite_sociale}",
                date_ouverture=fake.date_this_year(),
                patient=patient,
                antecedents={"conditions": fake.words(nb=3)}
            )
            dossier.consultations.add(random.choice(consultations))
            dossier.certificats_medicaux.add(random.choice(certificats))

        # Additional Models Population
        radiologues = [
            Radiologue.objects.create(
                id_radiologue=f"RAD-{i+1}",
                nom=fake.last_name(),
                prenom=fake.first_name()
            ) for i in range(5)
        ]

        laborantiens = [
            Laborantien.objects.create(
                id_laborantien=f"LAB-{i+1}",
                nom=fake.last_name(),
                prenom=fake.first_name()
            ) for i in range(5)
        ]

        administratif = [
            Administratif.objects.create(
                id_administratif=f"ADM-{i+1}",
                nom=fake.last_name(),
                prenom=fake.first_name()
            ) for i in range(3)
        ]

        self.stdout.write(self.style.SUCCESS("Database successfully populated with mock data."))
