from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'role': self.user.profile.role if hasattr(self.user, 'profile') else 'user',
            'department': self.user.profile.department if hasattr(self.user, 'profile') else 'General'
        }
        data['token'] = data.pop('access') # Match frontend expectation
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

urlpatterns = [
    path('auth/register/', views.register, name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    
    path('predictions/', views.get_predictions, name='predictions-list'),
    path('predictions/save/', views.save_prediction, name='predictions-save'),
    path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    path('profile/', views.get_profile, name='profile'),
]
