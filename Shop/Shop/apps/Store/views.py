from django.shortcuts import render, get_object_or_404
from ..Category.models import Category
from utils.python.app_store import paginate
from .models import Product
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
def store(request, slug_category=None):
    categories = Category.objects.all()
    if slug_category!=None:
        category_product = get_object_or_404(Category, slug_category = slug_category)
        products = Product.objects.all().filter(category = category_product, is_available=True).order_by("id")
        paginateStore,numberPerPage,numberPage = paginate(request, products, 4)
    else:
        products = Product.objects.all().filter(is_available=True).order_by("id")
        paginateStore,numberPerPage,numberPage = paginate(request, products, 4)
        
    
    return render(request, "store/store.html",{
        "categories": categories,
        "products": paginateStore,
        "numberPerPage" :numberPerPage,
        "numberPage":numberPage
    })
def product(request,slug_category, slug):
    detail_product = Product.objects.get(category__slug_category = slug_category,slug = slug)
    return render(request, "store/product_detail.html",{
        "detail_product": detail_product,
    })
    
