from django.contrib.auth.models import User
from rest_framework import serializers
from django.db import models

from authentication.serializers import UserSerializer
from todo.models import Todo


# sql_lite
class TodoSerializer(serializers.ModelSerializer):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="todos", blank=True, null=True)

    class Meta:
        model = Todo
        # fields = ('id', 'todo_text', 'todo_status', 'todo_created_date')
        fields = '__all__'

    def create(self, validated_data):
        return Todo.objects.create(**validated_data)
