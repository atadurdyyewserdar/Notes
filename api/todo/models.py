from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    todo_text = models.TextField()
    todo_status = models.BooleanField()
    todo_created_date = models.DateField()
    author = models.ForeignKey(User, related_name='todos', on_delete=models.CASCADE, blank=True, null=True)