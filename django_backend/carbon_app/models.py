from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.fields.related.OneToOneField):
    pass  # We'll just define the model formally

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    department = models.CharField(max_length=100, default='General')
    role = models.CharField(max_length=50, default='user')

class CarbonPrediction(models.fields.related.ForeignKey):
    pass

class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='predictions')
    energy_usage_kwh = models.FloatField(null=True, blank=True)
    water_usage_liters = models.FloatField(null=True, blank=True)
    clothing_spend = models.FloatField(null=True, blank=True)
    consumption_spend = models.FloatField(null=True, blank=True)
    housing_type = models.CharField(max_length=50, default='Dormitory')
    transport_mode = models.CharField(max_length=50, null=True, blank=True)
    
    electricity_kwh_daily = models.FloatField(null=True, blank=True)
    transport_km = models.FloatField(null=True, blank=True)
    food_type = models.CharField(max_length=50, null=True, blank=True)
    waste_kg = models.FloatField(null=True, blank=True)
    
    predicted_co2 = models.FloatField()
    carbon_level = models.CharField(max_length=50)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.predicted_co2} kg"
