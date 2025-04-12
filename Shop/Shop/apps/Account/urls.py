from django.urls import path, include
from . import views

urlpatterns = [
    path("register/",views.Register,name="register"),
    path("login/",views.login,name="login"),
]