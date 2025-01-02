
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from shared_models.models import Ordonnance, Medicament
class ValidateAndAddOrdonnance(APIView):
    def post(self, request):
        try:

            # Extract data from the request
            data = request.data
            medicament_ids = data.get('medicaments', [])
            doses = data.get('doses', [])
            id_ordonnance = data.get('id_ordonnance')
            if Ordonnance.objects.filter(id_ordonnance=id_ordonnance).exists() :
                return Response({'action not possible': 'Ordonnance exist'}, status=status.HTTP_400_BAD_REQUEST)

            # Validate data
            if not medicament_ids or not doses:
                return Response({'error': 'Medications and doses are required.'}, status=status.HTTP_400_BAD_REQUEST)

            if len(medicament_ids) != len(doses):
                return Response({'error': 'Each medication must have a corresponding dose.'}, status=status.HTTP_400_BAD_REQUEST)

            # Verify medications exist
            valid_medicaments = Medicament.objects.filter(id__in=medicament_ids)
            if valid_medicaments.count() != len(medicament_ids):
                return Response({'error': 'One or more medications are invalid.'}, status=status.HTTP_400_BAD_REQUEST)

            # Create and save the ordonnance
            ordonnance = Ordonnance.objects.create(
                id_ordonnance=data.get('id_ordonnance'),
                date=data.get('date'),
                duree_traitement=data.get('duree_traitement'),
                consultation_id=data.get('consultation'),
                doses=doses  
            )
            ordonnance.medicaments.set(valid_medicaments)
            ordonnance.doses = doses
            ordonnance.status = 'VALIDATED'
            ordonnance.save()

            return Response({'message': 'Ordonnance validated and added successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

