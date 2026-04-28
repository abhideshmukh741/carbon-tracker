from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Prediction

class UserSerializer(serializers.ModelSerializer):
    department = serializers.CharField(source='profile.department', read_only=True)
    role = serializers.CharField(source='profile.role', read_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'department', 'role')

class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = '__all__'
