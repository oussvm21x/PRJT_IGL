from django.db import models


# Medecin Model
class Medecin(models.Model):
    id_medecin = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    specialite = models.CharField(max_length=100)


# Patient Model
class Patient(models.Model):
    num_securite_sociale = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    date_naissance = models.DateField()
    adresse = models.CharField(max_length=255)
    telephone = models.CharField(max_length=20)
    email = models.EmailField()
    medecin_traitant = models.ForeignKey(
        Medecin, on_delete=models.SET_NULL, null=True, related_name='patients'
    )
    personne_contact = models.CharField(max_length=100)


# Resume Model
class Resume(models.Model):
    id_resume = models.CharField(max_length=50)
    date = models.DateField()
    contenu = models.TextField()
    antecedents = models.JSONField()  # List of strings
    auteur = models.ForeignKey(Medecin, on_delete=models.CASCADE)


# Examen Model
class Examen(models.Model):
    id_examen = models.CharField(max_length=50)
    type = models.CharField(max_length=100)
    date = models.DateField()
    resultat = models.TextField()

# Medicament Model


class Medicament(models.Model):
    nom = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    voie_administration = models.CharField(max_length=100)


# Infirmier Model
class Infirmier(models.Model):
    id_infirmier = models.CharField(max_length=50)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)


# Soin Model

class Soin(models.Model):
    id_soin = models.CharField(max_length=50)
    date = models.DateField()
    description = models.TextField()
    medicaments_administres = models.ManyToManyField(
        Medicament, related_name='soins'
    )
    infirmier = models.ForeignKey(Infirmier, on_delete=models.CASCADE)
    observations = models.TextField()


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


# DossierPatient Model
class DossierPatient(models.Model):
    id_dossier = models.CharField(max_length=50)
    date_ouverture = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    antecedents = models.JSONField()  # List of strings
    consultations = models.ManyToManyField(
        Consultation, related_name='dossiers')
    certificats_medicaux = models.ManyToManyField(
        CertificatMedical, related_name='dossiers'
    )


# Ordonnance Model
class Ordonnance(models.Model):
    id_ordonnance = models.CharField(max_length=50)
    date = models.DateField()
    medicaments = models.ManyToManyField(
        Medicament, related_name='ordonnances')
    doses = models.JSONField()  # List of doses
    duree_traitement = models.CharField(max_length=100)


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


# ExamenBiologique Model
class ExamenBiologique(models.Model):
    parameters = models.JSONField()
    values = models.JSONField()
    graphique_tendance = models.CharField(max_length=255)


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
