from django.urls import path
from .views import SoinListView, SoinDetailView, InfirmierListView, InfirmierDetailView, MedicamentListView, MedicamentDetailView

urlpatterns = [
    # Soin URLs (Care activities)
    path('soins/', SoinListView.as_view(), name='soin-list'),
    path('soins/<int:pk>/', SoinDetailView.as_view(), name='soin-detail'),

    # Infirmier URLs (Nurses)
    path('infirmiers/', InfirmierListView.as_view(), name='infirmier-list'),
    path('infirmiers/<int:pk>/', InfirmierDetailView.as_view(), name='infirmier-detail'),

    # Medicament URLs
    path('medicaments/', MedicamentListView.as_view(), name='medicament-list'),
    path('medicaments/<int:pk>/', MedicamentDetailView.as_view(), name='medicament-detail'),

]
