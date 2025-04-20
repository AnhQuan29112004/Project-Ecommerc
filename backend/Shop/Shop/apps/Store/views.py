from django.shortcuts import render, get_object_or_404
from ..Category.models import Category
from utils.python.app_store import paginate
from .models import Product
from Shop.apps.Account.models import VendorProfile, Account
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from Shop.apps.Account.serializers import VendorSerializer
from Shop.apps.Store.serializer import ProductSerializer

def store(request, slug_category=None):
    categories = Category.objects.all()
    if slug_category!=None:
        category_product = get_object_or_404(Category, slug_category = slug_category)
        products = Product.objects.all().filter(category = category_product, is_available=True).order_by("id")
        paginateStore,numberPerPage,numberPage = paginate(request, products, 4)
    else:
        products = Product.objects.all().filter(is_available=True, product_status = 'Ok').order_by("id")
        paginateStore,numberPerPage,numberPage = paginate(request, products, 4)
        
    
    return render(request, "store/store.html",{
        "categories": categories,
        "products": paginateStore,
        "numberPerPage" :numberPerPage,
        "numberPage":numberPage,
        "slug_category": slug_category,
    })
def product_detail(request,slug_category, slug):
    detail_product = Product.objects.get(category__slug_category = slug_category,slug = slug)
    return render(request, "store/product_detail.html",{
        "detail_product": detail_product,
    })
    


def vendor_list(request):
    vendors = VendorProfile.objects.all()
    return render(request, 'Vendor/vendor_list.html',{
        'vendors':vendors
    })
    
class vendor_list_api(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = VendorProfile.objects.all()
    serializer_class = VendorSerializer
    authentication_classes = [JWTAuthentication]
    def get_queryset(self):
        queryset = super().get_queryset()
        vendor = self.request.query_params.get('vendor', None)
        if vendor:
            queryset = queryset.filter(vendorProduct__product_name__icontains=vendor)
        return queryset
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]
    
        
        
class VendorProductListView(ListAPIView):
    queryset = VendorProfile.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        vendor_id = self.kwargs.get('id')
        if vendor_id:
            queryset = queryset.filter(id=vendor_id)
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        