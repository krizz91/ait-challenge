from django.contrib.auth import login, logout
from django.http import HttpResponse
from import_export.formats.base_formats import XLS, XLSX
from rest_framework import status, serializers as drf_serializers, generics
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

import magic

from challenge import serializers
from challenge.models import Article
from challenge.resource import ArticleResource

class LoginView(GenericAPIView):

    permission_classes = (AllowAny, )
    serializer_class = serializers.LoginSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        serializer = self.get_serializer(data={'username': username,
                                               'password': password})

        try:
            if not serializer.is_valid():
                response = Response({"status": "failed",
                                     "message": serializer.errors},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                user = serializer.validated_data['user']
                login(self.request, user)

                response = Response({
                    "status": "success"
                    }, status=status.HTTP_200_OK)
        except Exception as e:
            response = Response({"status": "failed",
                                 "message": e},
                                status=status.HTTP_200_OK)
        return response


class LogoutView(GenericAPIView):

    permission_classes = (IsAuthenticated, )
    serializer_class = drf_serializers.Serializer

    def post(self, request, *args, **kwargs):
        logout(self.request)
        return Response({"status": "success",
                         "message": "Successfully logged out."},
                        status=status.HTTP_200_OK)

class ArticleListView(GenericAPIView):
    """

    """

    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        """

        """
        articles = Article.objects.all()
        serializedArticles = serializers.ArticlesSerializer(articles, many=True)
        return Response({
            'data': serializedArticles.data,
            'status': 'success'
            }, status=status.HTTP_200_OK)

class CreateArticleView(generics.CreateAPIView):
    """

    """

    permission_classes = (IsAuthenticated, )
    serializer_class = serializers.ArticlesSerializer

class GetArticleView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Article.objects.all()
    serializer_class = serializers.ArticlesSerializer
    lookup_field = 'id'

class UpdateArticleView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = Article.objects.all()
    serializer_class = serializers.ArticlesSerializer
    lookup_field = 'id'

class ArticleImportView(GenericAPIView):
    permission_classes = (IsAuthenticated, )
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = serializers.ImportSerializer

    def post(self, request, *args, **kwargs):
        archivo = request.FILES['file'].read()
        mime = magic.Magic(mime=True)
        formato = mime.from_buffer(archivo)

        if formato == 'application/vnd.ms-excel':
            imported_data = XLS().create_dataset(archivo)
        elif formato == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            imported_data = XLSX().create_dataset(archivo)
        else:
            return Response({'error': 'Formato de archivo no compatible'}, status=400)
        
        for data in imported_data:
            try:
                ## FIXME: Optimize
                received_code = data[0]
                if(Article.objects.filter(code=received_code).exists()):
                    article = Article.objects.get(code=received_code)
                else:
                    article = Article()
                article.code = received_code
                article.description = data[1]
                article.price = data[2]
                article.save()
            except Exception as e:
                print(e)
                return Response({'error': 'Error en la importacion de datos'})
        return Response({'mensaje': 'Datos importados correctamente'})

class ArticleExportView(GenericAPIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        try:
            article_resource = ArticleResource()
            dataset = article_resource.export()
            response = HttpResponse(dataset.xls, content_type='application/vnd.ms-excel')
            response['Content-Disposition'] = 'attachment; filename="export.xls"'
            return response
        except Exception as e:
            return Response({'error': 'Error en la exportacion de datos'})
