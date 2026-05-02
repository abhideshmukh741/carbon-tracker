import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_project.settings')
django.setup()

from django.contrib.auth.models import User

admin_username = os.environ.get('ADMIN_USERNAME', 'admin')
admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
admin_email = os.environ.get('ADMIN_EMAIL', 'admin@example.com')

if not User.objects.filter(username=admin_username).exists():
    print(f"Creating superuser {admin_username}")
    User.objects.create_superuser(username=admin_username, email=admin_email, password=admin_password)
else:
    print(f"Superuser {admin_username} already exists")
