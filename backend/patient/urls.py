from django.urls import path
from .views import CreatePatientView, GetPatientDetailsView, PatientByNSSView , SearchPatientByQRCode

urlpatterns = [
    path('api/', CreatePatientView.as_view(), name='create_patient'),
    path('api/<str:num_securite_sociale>/', GetPatientDetailsView.as_view(), name='get_patient_details'),
    path('api/nss/<str:nss>/', PatientByNSSView.as_view(), name='patient-by-nss'),
    path('api/qr-code/<str:qr_code>/', SearchPatientByQRCode.as_view(), name='patient-by-qr-code'),
]
