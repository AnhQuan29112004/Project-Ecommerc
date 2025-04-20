from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path("", views.store, name="store"),
    path("vendors/", views.vendor_list, name="vendors"),
    path("<slug:slug_category>/", views.store, name="get_category"),
    path("<slug:slug_category>/<slug:slug>", views.product_detail, name="get_product"),

]
