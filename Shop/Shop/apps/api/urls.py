

from django.urls import path,include
from decouple import config

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from Shop.apps.Account.views import RegisterAPIView, LogoutAPIView, GetUserAPIView,LoginAPIView, CustomTokenRefreshView
version_api = config('VERSION_API')

urlpatterns = [
    path(f'{version_api}/auth/login/', LoginAPIView.as_view(), name='loginAPI'),
    path(f'{version_api}/auth/register/', RegisterAPIView.as_view(), name='registerAPI'),
    path(f'{version_api}/auth/getUser/', GetUserAPIView.as_view(), name='getUserAPI'),
    path(f'{version_api}/auth/getAccesstoken/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path(f'{version_api}/auth/logout/', LogoutAPIView.as_view(), name='logoutAPI'),
]
