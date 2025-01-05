from django.db import models
from django.contrib.auth.models import AbstractUser , Permission ,Group
from django.conf import Settings
from rest_framework.authtoken.models import Token
import qrcode
import io
from django.core.files.base import ContentFile
import os
from django.conf import settings


class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('administratif', 'Administratif'),
        ('patient', 'Patient'),
        ('medecin', 'Medecin'),
        ('infirmier', 'Infirmier'),
        ('radiologue', 'Radiologue'),
        ('laborantien', 'Laborantien'),
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

def generate_and_save_qr_code(nss, date_of_birth):
    qr = qrcode.QRCode()
    qr_data = f"{nss}-{date_of_birth}"  # Combine NSS and Date of Birth
    qr.add_data(qr_data)
    qr.make(fit=True)
    img = qr.make_image(fill="black", back_color="white")

    qr_directory = os.path.join(settings.MEDIA_ROOT, "qrcodes")
    os.makedirs(qr_directory, exist_ok=True)
    file_name = f"{nss}:{date_of_birth}.png"
    file_path = os.path.join(qr_directory, file_name)
    img.save(file_path)
    return f"qrcodes/{file_name}"  # Return relative path for storage in the database


# Patient Model
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    num_securite_sociale = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField(default="1900-01-01")
    adresse = models.CharField(max_length=255)
    telephone = models.CharField(max_length=20)
    email = models.EmailField()
    medecins_traitants = models.ManyToManyField(Medecin, related_name='patients', blank=True)
    personne_contact = models.TextField(blank=True, default="[]")
    qr_code = models.ImageField(upload_to="qrcodes/", blank=True, null=True)  # Store QR image path
    gender = models.BooleanField(default=True)  # True for male, False for female
    def save(self, *args, **kwargs):
        if not self.qr_code:  # Only generate if not already present
            qr_image_path = generate_and_save_qr_code(self.num_securite_sociale,self.date_naissance)
            self.qr_code = qr_image_path
        super().save(*args, **kwargs)


# Resume Model
class Resume(models.Model):
    id_resume = models.CharField(max_length=50)
    date = models.DateField()
    contenu = models.TextField()
    antecedents = models.JSONField()  # List of strings
    auteur = models.ForeignKey(Medecin, on_delete=models.CASCADE, null=True, blank=True)  # Default to a specific Medecin ID
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='resumes',null=True, blank=True)


# Examen Model
class Examen(models.Model):
    id_examen = models.CharField(max_length=50)
    type = models.CharField(max_length=100)
    date = models.DateField()
    resultat = models.TextField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='examens',null=True, blank=True)


# Medicament Model
class Medicament(models.Model):
    nom = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    voie_administration = models.CharField(max_length=100)


# Infirmier Model
class Infirmier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id_infirmier = models.CharField(max_length=50, blank=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    def save(self, *args, **kwargs):
        # If id_infirmier is not set, generate one
        if not self.id_infirmier:
            self.id_infirmier = Infirmier.objects.count() + 1
        super(Infirmier, self).save(*args, **kwargs)


# Soin Model
class Soin(models.Model):
    id_soin = models.CharField(max_length=50)
    date = models.DateField()
    description = models.TextField()
    medicaments_administres = models.ManyToManyField(Medicament, related_name='soins')
    infirmier = models.ForeignKey(Infirmier, on_delete=models.CASCADE)
    observations = models.TextField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='soins',null=True, blank=True)


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
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='certificats_medicaux',null=True, blank=True)
    auteur = models.ForeignKey(Medecin, on_delete=models.CASCADE, null=True, blank=True)  # Default to a specific Medecin ID


# DossierPatient Model
class DossierPatient(models.Model):
    id_dossier = models.CharField(max_length=50)
    date_ouverture = models.DateField()
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name='dossier')
    antecedents = models.JSONField()  # List of strings
    consultations = models.ManyToManyField(Consultation, related_name='dossiers', blank=True)
    certificats_medicaux = models.ManyToManyField(CertificatMedical, related_name='dossiers', blank=True)


# Ordonnance Model
class Ordonnance(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('VALIDATED', 'Validated'),
        ('REJECTED', 'Rejected'),
    ]
    id_ordonnance = models.CharField(max_length=50)
    date = models.DateField()
    medicaments = models.ManyToManyField(Medicament, related_name='ordonnances')
    doses = models.JSONField()  # List of doses
    duree_traitement = models.CharField(max_length=100)
    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, related_name='ordonnances',null=True, blank=True)

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
    examen = models.ForeignKey(Examen, on_delete=models.CASCADE, related_name='examens_radiologiques',null=True, blank=True)
    radiologue = models.ForeignKey('Radiologue', on_delete=models.CASCADE, related_name='examens_radiologiques',null=True, blank=True)
# ExamenBiologique Model
class ExamenBiologique(models.Model):
    parameters = models.JSONField()
    values = models.JSONField()
    graphique_tendance = models.CharField(max_length=255)
    examen = models.OneToOneField(Examen, on_delete=models.CASCADE, related_name='examens_biologiques',null=True, blank=True)
    laborantien = models.ForeignKey('Laborantien', on_delete=models.CASCADE, related_name='examens_biologiques',null=True, blank=True)


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
