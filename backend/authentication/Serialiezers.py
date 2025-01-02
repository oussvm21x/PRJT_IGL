from rest_framework import serializers
from shared_models.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.get('role')
        password = validated_data.pop('password', None)
        
        if role == 'admin':
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
        elif role == 'infirmier':  
            Infirmier.objects.create(user=user)
        elif role == 'administratif':
            Administratif.objects.create(user=user)
        elif role == 'radiologue':
            Radiologue.objects.create(user=user)
        elif role == 'laborantien':
            Laborantien.objects.create(user=user)
        
        return user

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Patient
        fields = ['user', 'num_securite_sociale', 'nom', 'prenom', 'date_naissance', 'adresse', 'telephone', 'email','personne_contact']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        patient = Patient.objects.create(user=user, **validated_data)
        return patient

class MedecinSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Medecin
        fields = ['user', 'id_medecin', 'nom', 'prenom', 'specialite']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        medecin = Medecin.objects.create(user=user, **validated_data)
        return medecin

class InfirmierSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Infirmier
        fields = ['user', 'nom', 'prenom']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        infermier = Infirmier.objects.create(user=user, **validated_data)
        return infermier

class AdministratifSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Administratif
        fields = ['user', 'id_administratif', 'nom', 'prenom']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        administratif = Administratif.objects.create(user=user, **validated_data)
        return administratif

class RadiologueSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Radiologue
        fields = ['user', 'id_radiologue', 'nom', 'prenom']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        radiologue = Radiologue.objects.create(user=user, **validated_data)
        return radiologue

class LaborantienSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Laborantien
        fields = ['user', 'id_laborantien', 'nom', 'prenom']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        laborantien = Laborantien.objects.create(user=user, **validated_data)
        return laborantien

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
