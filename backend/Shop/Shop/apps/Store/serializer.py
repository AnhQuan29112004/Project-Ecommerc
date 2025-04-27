from rest_framework import serializers
from Shop.apps.Store.models import Product, Category, ProductGallery
from Shop.apps.Account.serializers import VendorSerializer

class RelatedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'old_price', 'new_price', 'image', 'category','slug']
  

class ProductSerializer(serializers.ModelSerializer):
    vendor = VendorSerializer(read_only=True, many=False)
    relatedProduct = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = '__all__'
        extra_fields = ('relatedProduct',)
    def get_relatedProduct(self, obj):

        queryset = Product.objects.filter(is_available=True, product_status='Ok').exclude(id=obj.id).order_by('-create_at')[:4]
        serializer = RelatedProductSerializer(queryset, many=True).data
        return serializer
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['percentage'] = instance.get_percentage
        representation['category'] = instance.category.category_name
        return representation
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'