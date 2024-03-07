from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Article(models.Model):
    code = models.CharField(verbose_name=_('Code'), max_length=10, unique=True)
    description = models.TextField(verbose_name=_('Description'))
    price = models.DecimalField(verbose_name=_('Price'), decimal_places=2, max_digits=12)

    class Meta:
        verbose_name = _('Article')
        verbose_name_plural = _('Articles')

    def __str__(self):
        return self.description
