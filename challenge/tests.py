import os
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from challenge.models import Article

User = get_user_model()

# Create your tests here.
class LoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = 'testuser'
        self.password = 'testpassword'
        self.user = User.objects.create_user(username=self.username, password=self.password)
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_login(self):
        url = reverse('login')
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout(self):
        url_login = reverse('login')
        data_login = {'username': self.username, 'password': self.password}
        self.client.post(url_login, data_login, format='json')

        url_logout = reverse('logout')
        response = self.client.post(url_logout)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ArcticleTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = 'testuser'
        self.password = 'testpassword'
        self.user = User.objects.create_user(username=self.username, password=self.password)
        self.client.login(username=self.username, password=self.password)
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.article_data = {'code': '123', 'description': 'Test Article', 'price': 10.99}
        self.article = Article.objects.create(**self.article_data)

    def test_article_list_view(self):
        url = reverse('list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 1)

    def test_create_article_view(self):
        new_article_data = {'code': '456', 'description': 'New Article', 'price': 20.99}
        url = reverse('create')
        response = self.client.post(url, new_article_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.count(), 2)

    def test_get_article_view(self):
        url = reverse('get', args=[self.article.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['code'], self.article_data['code'])

    def test_update_article_view(self):
        updated_description = 'Updated Description'
        url = reverse('update', args=[self.article.id])
        response = self.client.put(url, {'description': updated_description})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Article.objects.get(id=self.article.id).description, updated_description)

    def test_article_import_view(self):
        xls_file_path = os.path.join(os.path.dirname(__file__), 'fixtures', 'test_file.xls')
        print(xls_file_path)

        # Abrir el archivo y leer su contenido
        with open(xls_file_path, 'rb') as xls_file:
            file_content = xls_file.read()

            # Crear un objeto SimpleUploadedFile con el contenido del archivo
            uploaded_file = SimpleUploadedFile("test_file.xls", file_content, content_type='application/vnd.ms-excel')
            url = reverse('import')
            response = self.client.post(url, {'file': uploaded_file}, format='multipart')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(Article.objects.count(), 2)

    def test_article_export_view(self):
        url = reverse('export')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('attachment; filename="export.xls"', response['Content-Disposition'])

