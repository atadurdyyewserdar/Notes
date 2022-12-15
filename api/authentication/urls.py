from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import LoginView, RegisterUser, CustomAuthToken

urlpatterns = [
    path('register', RegisterUser.as_view({'post': 'create'})),
    path('login', CustomAuthToken.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
