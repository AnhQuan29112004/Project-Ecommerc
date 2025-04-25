from rest_framework import serializers
from Shop.apps.Store.models import Product, Category, ProductGallery

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['category'] = instance.category.category_name
        return representation
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'