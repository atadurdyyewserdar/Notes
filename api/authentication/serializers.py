from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from pkg_resources import require
from rest_framework import serializers
from rest_framework.exceptions import NotAuthenticated, ValidationError
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):

    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'first_name', 'last_name', 'token')
        extra_kwargs = {
            "username": {
                "error_messages": {
                    "unique": ("Username already exists")
                }
            }
        }

    def create(self, validated_data):
        user = get_user_model().objects.create(
            **validated_data
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(
        max_length=128, write_only=True, required=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)
        if user is None:
            raise NotAuthenticated(
                'Username or password incorrect.'
            )
        return user
