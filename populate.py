import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User

def populate():
    user = User.objects.create_user(username='admin', password='adminadmin', is_staff=True, is_superuser=True)

    print("Datos creados correctamente")

if __name__ == '__main__':
    print("Comenzando la población de datos...")
    populate()
