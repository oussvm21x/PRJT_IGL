from django.urls import path
from .views import CreateConsultationView, ListPatientConsultations, ListDoctorConsultations, ConsultationDetail

urlpatterns = [
    path('api/consultations/create/<int:doctor_id>/<int:patient_nss>/', CreateConsultationView.as_view(), name='create-consultation'),
    path('api/patient/<int:patient_nss>/', ListPatientConsultations.as_view(), name='list-consultations-patient'),
    path('api/doctor/<int:doctor_id>/', ListDoctorConsultations.as_view(), name='list-consultations-doctor'),
    path('api/consultation/<int:consultation_id>/', ConsultationDetail.as_view(), name='consultation-detail'),
]

