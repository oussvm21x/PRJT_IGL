from rest_framework import serializers
from shared_models.models import User, Patient, Medecin, Infirmier

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','role', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    

    def create(self, validated_data):
        role = validated_data.get('role')
        password = validated_data.pop('password', None)
        if role == 'admin' :
            user = User.objects.create_superuser(**validated_data)
        else:
            user = User.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()        

        if role == 'patient':
            Patient.objects.create(user=user)
        elif role == 'medecin':
            Medecin.objects.create(user=user)
        elif role == 'infermier':
            Infirmier.objects.create(user=user)
        
        return user
    
    

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Patient
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        patient = Patient.objects.create(user=user, **validated_data)
        return patient

class MedecinSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Medecin
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        medecin = Medecin.objects.create(user=user, **validated_data)
        return medecin

class InfermierSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Infirmier
        fields = ['user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        infermier = Infirmier.objects.create(user=user, **validated_data)
        return infermier
    
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)