from django.contrib.auth import authenticate, get_user_model
# from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from challenge.models import Article

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            try:
                usr = User.objects.get(username=username)
            except Exception as e:
                msg = _('Credentials are invalid.')
                raise ValidationError(msg)
            user = authenticate(username=username, password=password)

        else:
            msg = _('Must include "username" and "password".')
            raise ValidationError(msg)

        if not user or not user.is_active:
            msg = _('Credentials are invalid.')
            raise ValidationError(msg)

        attrs['user'] = user
        return attrs

class ArticlesSerializer(serializers.ModelSerializer):
    code = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    price = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)

    class Meta:
        model = Article
        fields = ('id', 'code', 'description', 'price')
        read_only_fields = ('id', 'code', 'description', 'price')

class ImportSerializer(serializers.Serializer):
    file = serializers.FileField()
