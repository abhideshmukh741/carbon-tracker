from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile, Prediction
from .serializers import UserSerializer, PredictionSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import pandas as pd
from datetime import datetime

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    department = data.get('department', 'General')
    
    if not username or not email or not password:
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
    if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
        return Response({'error': 'Username or email already exists'}, status=status.HTTP_409_CONFLICT)
        
    user = User.objects.create_user(username=username, email=email, password=password)
    Profile.objects.create(user=user, department=department)
    
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'message': 'Registration successful',
        'token': str(refresh.access_token),
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'department': department,
            'role': 'user'
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_predictions(request):
    preds = Prediction.objects.filter(user=request.user).order_by('-created_at')[:50]
    serializer = PredictionSerializer(preds, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_prediction(request):
    # This is called after FastAPI returns prediction
    # Frontend sends both input and prediction data here
    data = request.data
    data['user'] = request.user.id
    serializer = PredictionSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    from django.db.models import Avg, Min, Max, Count
    preds = Prediction.objects.filter(user=request.user).order_by('created_at')
    
    stats = preds.aggregate(
        total=Count('id'),
        avg_co2=Avg('predicted_co2'),
        min_co2=Min('predicted_co2'),
        max_co2=Max('predicted_co2')
    )
    
    # Month grouping simply using pandas for convenience
    df = pd.DataFrame(list(preds.values('created_at', 'predicted_co2')))
    monthly = []
    if not df.empty:
        df['month'] = df['created_at'].dt.strftime('%Y-%m')
        m_grouped = df.groupby('month').agg(predictions=('created_at', 'count'), avg_co2=('predicted_co2', 'mean')).reset_index()
        monthly = m_grouped.to_dict('records')
    
    # transport & housing distributions
    t_dist = list(preds.values('transport_mode').annotate(count=Count('id'), avg_co2=Avg('predicted_co2')))
    h_dist = list(preds.values('housing_type').annotate(count=Count('id'), avg_co2=Avg('predicted_co2')))
    
    # Mock source breakdown from final prediction
    source_breakdown = [{'label': 'Energy', 'pct': 30}, {'label': 'Water', 'pct': 15}, {'label': 'Transport', 'pct': 35}, {'label': 'Food & lifestyle', 'pct': 20}]
    
    return Response({
        'predictions': PredictionSerializer(preds[:30], many=True).data,
        'stats': stats,
        'monthly': monthly,
        'transport_distribution': t_dist,
        'housing_distribution': h_dist,
        'national_avg': 292.0,
        'campus_avg': 267.0,
        'source_breakdown': source_breakdown,
        'benchmark_bars': {
            'labels': ['Your average', 'National benchmark', 'Campus benchmark'],
            'values': [stats['avg_co2'] or 0, 292.0, 267.0]
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    stats = Prediction.objects.filter(user=user).aggregate(predictions=Count('id'), avg_co2=Avg('predicted_co2'), best_co2=Min('predicted_co2'))
    return Response({
        'user': UserSerializer(user).data,
        'stats': stats
    })
