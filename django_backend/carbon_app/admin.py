from django.contrib import admin
from .models import Profile, Prediction

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'department', 'role')
    search_fields = ('user__username', 'department')

@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ('user', 'predicted_co2', 'carbon_level', 'created_at')
    list_filter = ('carbon_level', 'created_at')
    search_fields = ('user__username',)
