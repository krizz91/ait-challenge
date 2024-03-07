from import_export import resources

from challenge.models import Article

class ArticleResource(resources.ModelResource):
    class Meta:
        model = Article
        fields = ('id', 'code', 'description', 'price')
        encoding = 'utf-8'
