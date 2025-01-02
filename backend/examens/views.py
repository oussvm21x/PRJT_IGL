from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ExamenBiologiqueSerializer , ExamenRadiologiqueSerializer
from shared_models.models import ExamenBiologique, ExamenRadiologique , Consultation , Examen
@api_view(['POST'])
def upload_laboratory_results(request):
    """
    Submit laboratory results for a consultation.
    """
    # Check if data is provided in the request
    if not request.data:
        return Response({"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Use the serializer to validate and save the data
    serializer = ExamenBiologiqueSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the new laboratory exam result to the database
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # Return validation errors if the data is not valid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def upload_radiology_results(request):
    """
    Upload radiology images for a consultation.
    """
    # Check if data is provided in the request
    if not request.data:
        return Response({"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Use the serializer to validate and save the data
    serializer = ExamenRadiologiqueSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the new radiology exam result to the database
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # Return validation errors if the data is not valid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_all_results_for_consultation(request, consultation_id):
    try:
        # Get the consultation object
        consultation = Consultation.objects.get(id_consultation=consultation_id)

        # Get all related exams for the consultation
        examens = consultation.examens.all()
        print(examens)

        # Filter radiology and biological exams
        laboratory_results = ExamenBiologique.objects.filter(examen__in=examens)
        radiology_results = ExamenRadiologique.objects.filter(examen__in=examens)

        # Serialize the results
        laboratory_results_serializer = ExamenBiologiqueSerializer(laboratory_results, many=True)
        radiology_results_serializer = ExamenRadiologiqueSerializer(radiology_results, many=True)

        # Return the results
        return Response({
            'laboratory_results': laboratory_results_serializer.data,
            'radiology_results': radiology_results_serializer.data
        }, status=status.HTTP_200_OK)

    except Consultation.DoesNotExist:
        return Response({'error': 'Consultation not found.'}, status=status.HTTP_404_NOT_FOUND)
    except ExamenBiologique.DoesNotExist:
        return Response({'error': 'Laboratory results not found for this consultation.'}, status=status.HTTP_404_NOT_FOUND)
    except ExamenRadiologique.DoesNotExist:
        return Response({'error': 'Radiology results not found for this consultation.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
