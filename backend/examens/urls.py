from django.urls import path
from . import views

urlpatterns = [
    path('radiology/', views.upload_radiology_results, name='upload_radiology_results'),
    path('results/<int:consultation_id>/', views.get_all_results_for_consultation, name='get_all_results_for_consultation'),
    path('laboratory/', views.upload_laboratory_results, name='upload_laboratory_results'),
]
