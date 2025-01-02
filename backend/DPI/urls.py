from django.urls import path
from .views import CreateDPIView,ConsultPatientDPIView,SearchDPIByNSSView

urlpatterns = [
    path('',CreateDPIView.as_view(),name='create-Dpi'),
    path('consult',ConsultPatientDPIView.as_view(),name='consult-Dpi'),
    path('search/<int:nss>/', SearchDPIByNSSView.as_view(), name='search_dpi_by_nss'),

]