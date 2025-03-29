from .models import Category
from Store.models import Product
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
def categories(request):
    categories = Category.objects.all()
    categories_count = [
        {
            "category": category,
            "product_count": category.product_set.filter(is_available=True).count(),
        }
        for category in categories
    ]
    return render(request, "categories/categories.html", {
        "categories": categories_count,
    })