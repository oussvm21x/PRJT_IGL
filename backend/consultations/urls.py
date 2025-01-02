from django.urls import path
from .views import CreateConsultationView, ListPatientConsultations, ListDoctorConsultations, ConsultationDetail

urlpatterns = [
    path('create/<int:doctor_id>/<int:patient_nss>/', CreateConsultationView.as_view(), name='create-consultation'),
    path('patient/<int:patient_nss>/', ListPatientConsultations.as_view(), name='list-consultations-patient'),
    path('doctor/<int:doctor_id>/', ListDoctorConsultations.as_view(), name='list-consultations-doctor'),
    path('<int:consultation_id>/', ConsultationDetail.as_view(), name='consultation-detail'),
]

