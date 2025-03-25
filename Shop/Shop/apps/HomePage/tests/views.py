from django.shortcuts import render,HttpResponse,get_object_or_404
from ...Store.models import Product
from ...Category.models import Category
from utils.python.app_store import paginate
# Create your views here.
def home(request):
    list_product = Product.objects.all()
    print("User",request.user)
    return render(request, "Home/home.html", {
        "list_product": list_product,
        "user": request.user
    })
    
def search(request):
    keyword=request.GET.get('keyword','')
    categories = Category.objects.all()
    products = Product.objects.all().filter(product_name__icontains= keyword, is_available=True).order_by("id")
    paginateStore,numberPerPage,numberPage = paginate(request, products, 4)
    return render(request, "store/store.html",{
        "categories": categories,
        "products": paginateStore,
        "numberPerPage" :numberPerPage,
        "numberPage":numberPage,
        "keyword":keyword
    })