from django.shortcuts import render, get_object_or_404
from ..Category.models import Category
from utils.app_store import paginate
from .models import Product
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Create your views here.
def store(request, slug_category=None):
    categories = Category.objects.all()
    if slug_category!=None:
        category_product = get_object_or_404(Category, slug_category = slug_category)
        products = Product.objects.all().filter(category = category_product, is_available=True)
    else:
        products = Product.objects.all().filter(is_available=True)
        # paginate = Paginator(products, 4)
        # crrPage = request.GET.get('page')
        # paginateStore = paginate.get_page(crrPage)
        # numberPerPage = paginate.page_range
        # numberPage = paginateStore.number
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