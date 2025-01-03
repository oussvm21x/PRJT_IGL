from django.urls import path
from .views import RequestMedicalCertificateView

urlpatterns = [
    path('<str:nss>/', RequestMedicalCertificateView.as_view(), name='request_certificate'),
]
