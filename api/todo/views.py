from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from todo.filters import TodoFilter
from todo.models import Todo
from todo.pagination import TodoListPagination
from todo.serializers import TodoSerializer
from rest_framework.views import APIView

class TodoList(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = TodoListPagination
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)
    
    def get_queryset(self):
        queryset = self.queryset.filter(author=self.request.user)
        print(self.request.user)
        return queryset


class TodoSearch(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = TodoFilter
    pagination_class = TodoListPagination
    authentication_classes = [IsAuthenticated]


class TodoOption(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

