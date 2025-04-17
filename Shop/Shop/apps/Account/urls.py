from django.urls import path, include
from . import views

urlpatterns = [
    path("register/",views.registerview,name="register"),
    path("login/",views.loginview,name="login"),
]