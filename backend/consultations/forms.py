from django import forms
from shared_models.models import Consultation

class ConsultationForm(forms.ModelForm):
    class Meta:
        model = Consultation
        fields = ['date', 'motif', 'observations', 'resume', 'soins', 'examens']
