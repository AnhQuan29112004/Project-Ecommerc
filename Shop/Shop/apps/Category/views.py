from .models import Category
from Shop.apps.Store.models import Product
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializer import CategoriesSerializer
def categories(request):
    categories = Category.objects.all()
    categories_count = [
        {
            "category": category,
            "product_count": category.categoryProduct.filter(is_available=True).count(),
        }
        for category in categories
    ]
    return render(request, "categories/categories.html", {
        "categories": categories_count,
        "alo":"alo"
    })
    
class CategoriesListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoriesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]