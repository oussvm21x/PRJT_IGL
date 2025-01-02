from django.urls import path
from .views import ValidateAndAddOrdonnance

urlpatterns = [
    path('validate-add/', ValidateAndAddOrdonnance.as_view(), name='validate_and_add_ordonnance'),
]