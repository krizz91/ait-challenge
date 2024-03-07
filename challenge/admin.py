from django.contrib import admin
from import_export.admin import ImportExportModelAdmin 

from challenge.models import Article
from challenge.resource import ArticleResource

# Register your models here.
class ArticleAdmin(ImportExportModelAdmin):
    list_display = ('code', 'description', 'price')
    resource_classes = [ArticleResource, ]


admin.site.register(Article, ArticleAdmin)