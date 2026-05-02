import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_project.settings')
django.setup()

from django.contrib.auth.models import User

admins = [
    {"username": "abhideshmukh741", "password": "Abhi@123", "email": "abhi@example.com"},
    {"username": "gayatridixit", "password": "Gaye@123", "email": "gaye@example.com"},
    {"username": "yashchavhan", "password": "Yash@123", "email": "yash@example.com"},
]

for admin_data in admins:
    if not User.objects.filter(username=admin_data["username"]).exists():
        print(f"Creating superuser {admin_data['username']}")
        User.objects.create_superuser(
            username=admin_data["username"], 
            email=admin_data["email"], 
            password=admin_data["password"]
        )
    else:
        print(f"Superuser {admin_data['username']} already exists")

