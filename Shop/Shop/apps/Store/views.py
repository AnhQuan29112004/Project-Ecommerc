from django.shortcuts import render, get_object_or_404
from ..Category.models import Category
from .models import Product
# Create your views here.
def store(request, slug_category=None):
    categories = Category.objects.all()
    if slug_category!=None:
        category_product = get_object_or_404(Category, slug_category = slug_category)
        products = Product.objects.all().filter(category = category_product, is_available=True)
    else:
        products = Product.objects.all().filter(is_available=True)
    
    return render(request, "store/store.html",{
        "categories": categories,
        "products":products
    })