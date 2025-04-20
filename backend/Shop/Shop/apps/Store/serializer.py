from rest_framework import serializers
from Shop.apps.Store.models import Product, Category, ProductGallery

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'