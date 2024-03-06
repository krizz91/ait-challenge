from django.contrib.auth import login, logout
from rest_framework import status, serializers as drf_serializers, generics
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from challenge import serializers
from challenge.models import Article

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
