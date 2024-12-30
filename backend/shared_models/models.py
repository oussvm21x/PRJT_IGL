from django.db import models
from django.contrib.auth.models import AbstractUser , Permission ,Group
from django.conf import Settings
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('administratif', 'Administratif'),
        ('patient', 'Patient'),
        ('medecin', 'Medecin'),
        ('infermier', 'Infermier'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # Using descriptive related_name to avoid conflicts
    groups = models.ManyToManyField(
        Group,
        related_name='user_set_custom',  # Custom related name for reverse relation
        blank=True
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='permission_users',  # Custom related name for reverse relation
        blank=True
    )

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

    


# Medecin Model
class Medecin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id_medecin = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    specialite = models.CharField(max_length=100)


# Patient Model
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    num_securite_sociale = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    adresse = models.CharField(max_length=255)
    telephone = models.CharField(max_length=20)
    email = models.EmailField()
    medecins_traitants = models.ManyToManyField(Medecin, related_name='patients', blank=True)
    personne_contact = models.CharField(max_length=100)


# Resume Model
class Resume(models.Model):
    id_resume = models.CharField(max_length=50)
    date = models.DateField()
    contenu = models.TextField()
    antecedents = models.JSONField()  # List of strings
    auteur = models.ForeignKey(Medecin, on_delete=models.CASCADE, default=0)  # Default to a specific Medecin ID
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='resumes',default=0)


# Examen Model
class Examen(models.Model):
    id_examen = models.CharField(max_length=50)
    type = models.CharField(max_length=100)
    date = models.DateField()
    resultat = models.TextField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='examens',default=0)


# Medicament Model
class Medicament(models.Model):
    nom = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    voie_administration = models.CharField(max_length=100)


# Infirmier Model
class Infirmier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id_infirmier = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)


# Soin Model
class Soin(models.Model):
    id_soin = models.CharField(max_length=50)
    date = models.DateField()
    description = models.TextField()
    medicaments_administres = models.ManyToManyField(Medicament, related_name='soins')
    infirmier = models.ForeignKey(Infirmier, on_delete=models.CASCADE)
    observations = models.TextField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='soins',default=0)


# Consultation Model
class Consultation(models.Model):
    id_consultation = models.CharField(max_length=50)
    date = models.DateField()
    motif = models.CharField(max_length=255)
    observations = models.TextField()
    resume = models.OneToOneField(Resume, on_delete=models.CASCADE, null=True)
    soins = models.ManyToManyField('Soin', related_name='consultations')
    examens = models.ManyToManyField(Examen, related_name='consultations')


# CertificatMedical Model
class CertificatMedical(models.Model):
    id_certificat = models.CharField(max_length=50)
    date_emission = models.DateField()
    motif = models.CharField(max_length=255)
    duree_arret = models.CharField(max_length=100)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='certificats_medicaux',default=0)
    auteur = models.ForeignKey(Medecin, on_delete=models.CASCADE, default=0)  # Default to a specific Medecin ID


# DossierPatient Model
class DossierPatient(models.Model):
    id_dossier = models.CharField(max_length=50)
    date_ouverture = models.DateField()
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name='dossier')
    antecedents = models.JSONField()  # List of strings
    consultations = models.ManyToManyField(Consultation, related_name='dossiers')
    certificats_medicaux = models.ManyToManyField(CertificatMedical, related_name='dossiers')


# Ordonnance Model
class Ordonnance(models.Model):
    id_ordonnance = models.CharField(max_length=50)
    date = models.DateField()
    medicaments = models.ManyToManyField(Medicament, related_name='ordonnances')
    doses = models.JSONField()  # List of doses
    duree_traitement = models.CharField(max_length=100)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name='ordonnances',default=0)


# CompteRendu Model
class CompteRendu(models.Model):
    id_compte_rendu = models.CharField(max_length=50)
    date = models.DateField()
    contenu = models.TextField()
    auteur = models.CharField(max_length=100)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE)
    observations_complementaires = models.TextField()
    recommandations = models.TextField()
    examen_associe = models.ForeignKey(Examen, on_delete=models.CASCADE)


# ExamenRadiologique Model
class ExamenRadiologique(models.Model):
    type_image = models.CharField(max_length=100)
    fichier_image = models.FileField(upload_to='radiologie/')
    compte_rendu = models.OneToOneField(CompteRendu, on_delete=models.CASCADE)
    examen = models.ForeignKey(Examen, on_delete=models.CASCADE, related_name='examens_radiologiques',default=0)
    radiologue = models.ForeignKey('Radiologue', on_delete=models.CASCADE, related_name='examens_radiologiques',default=0)


# ExamenBiologique Model
class ExamenBiologique(models.Model):
    parameters = models.JSONField()
    values = models.JSONField()
    graphique_tendance = models.CharField(max_length=255)
    examen = models.OneToOneField(Examen, on_delete=models.CASCADE, related_name='examens_biologiques',default=0)
    laborantien = models.ForeignKey('Laborantien', on_delete=models.CASCADE, related_name='examens_biologiques',default=0)


# Radiologue Model
class Radiologue(models.Model):
    id_radiologue = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)


# Laborantien Model
class Laborantien(models.Model):
    id_laborantien = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)


# Administratif Model
class Administratif(models.Model):
    id_administratif = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
