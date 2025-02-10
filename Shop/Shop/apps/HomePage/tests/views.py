from django.shortcuts import render,HttpResponse
from ...Store.models import Product
# Create your views here.
def home(request):
    list_product = Product.objects.all()
    return render(request, "Home/home.html", {
        "list_product": list_product
    })