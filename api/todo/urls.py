from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.TodoList.as_view()),
    path('search', views.TodoSearch.as_view()),
    path('<int:pk>', views.TodoOption.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
