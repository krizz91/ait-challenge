from django.urls import path

from challenge.api.views import (
    LoginView,
    LogoutView,
    ArticleListView,
    CreateArticleView,
    GetArticleView,
    UpdateArticleView,
    ArticleExportView,
    ArticleImportView
    )

urlpatterns = [
    path('login/', view=LoginView.as_view(), name='login'),
    path('logout/', view=LogoutView.as_view(), name='logout'),
    path('list/', view=ArticleListView.as_view(), name='list'),
    path('get/<int:id>', view=GetArticleView.as_view(), name='get'),
    path('create/', view=CreateArticleView.as_view(), name='create'),
    path('update/<int:id>', view=UpdateArticleView.as_view(), name='update'),
    path('import/', view=ArticleImportView.as_view(), name='import'),
    path('export/', view=ArticleExportView.as_view(), name='export')
]
