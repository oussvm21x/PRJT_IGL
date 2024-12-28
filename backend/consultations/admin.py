from django.contrib import admin

# Register your models here.
from django.contrib import admin
from shared_models.models import *

# Register your models with the Django admin interface
admin.site.register(Medecin)
admin.site.register(Patient)
admin.site.register(Consultation)
admin.site.register(DossierPatient)
admin.site.register(Resume)
admin.site.register(CertificatMedical)
admin.site.register(Soin)
admin.site.register(Examen)
admin.site.register(ExamenBiologique)
admin.site.register(ExamenRadiologique)
admin.site.register(Laborantien)
admin.site.register(Infirmier)
admin.site.register(Medicament)
admin.site.register(Ordonnance)
admin.site.register(CompteRendu)
admin.site.register(Radiologue)
admin.site.register(Administratif)





