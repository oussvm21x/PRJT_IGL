from rest_framework import generics
from shared_models.models import Soin, Medicament, Infirmier, Patient
from .serializers import SoinSerializer, MedicamentSerializer, InfirmierSerializer, PatientSerializer

# View to list all care activities (Soin) and create new ones
class SoinListView(generics.ListCreateAPIView):
    queryset = Soin.objects.all()
    serializer_class = SoinSerializer

# View to get, update, or delete a specific care activity
class SoinDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Soin.objects.all()
    serializer_class = SoinSerializer

# View to list all nurses (Infirmier) and create new ones
class InfirmierListView(generics.ListCreateAPIView):
    queryset = Infirmier.objects.all()
    serializer_class = InfirmierSerializer

# View to get, update, or delete a specific nurse
class InfirmierDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Infirmier.objects.all()
    serializer_class = InfirmierSerializer

# View to list all medicaments and create new ones
class MedicamentListView(generics.ListCreateAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer

# View to get, update, or delete a specific medicament
class MedicamentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer


