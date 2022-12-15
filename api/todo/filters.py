import django_filters
from django_filters.rest_framework import FilterSet

from todo.models import Todo


class TodoFilter(FilterSet):
    todo_from_date = django_filters.rest_framework.DateFilter(field_name='todo_created_date', lookup_expr='gte')
    todo_to_date = django_filters.rest_framework.DateFilter(field_name='todo_created_date', lookup_expr='lte')
    todo_text = django_filters.rest_framework.CharFilter(field_name='todo_text', lookup_expr='startswith')

    class Meta:
        model = Todo
        fields = ['todo_status']
