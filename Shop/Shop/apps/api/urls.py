

from django.urls import path,include
from decouple import config

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from Shop.apps.Account.views import CustomTokenRefreshView, LoginAPI, LogoutAPI, RegisterAPI, GetUserView
version_api = config('VERSION_API')

urlpatterns = [
    path(f'{version_api}/auth/login/', LoginAPI.as_view(), name='loginAPI'),
    path(f'{version_api}/auth/register/', RegisterAPI.as_view(), name='registerAPI'),
    path(f'{version_api}/auth/getUser/', GetUserView.as_view(), name='getUserAPI'),
    path(f'{version_api}/auth/getAccesstoken/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path(f'{version_api}/auth/logout/', LogoutAPI.as_view(), name='logoutAPI'),
]
