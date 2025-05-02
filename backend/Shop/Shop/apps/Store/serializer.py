from rest_framework import serializers
from Shop.apps.Store.models import Product, Category,ReviewRating, ProductGallery
from Shop.apps.Account.models import Account

from Shop.apps.Account.serializers import VendorSerializer
from django.db.models import Sum, Avg

class RelatedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'old_price', 'new_price', 'image', 'category','slug']
  

class ProductSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    vendor = VendorSerializer(read_only=True, many=False)
    relatedProduct = serializers.SerializerMethodField()
    tag = serializers.SlugRelatedField(slug_field='name',many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
        extra_fields = ('relatedProduct','rating', 'average_rating')
        
    def get_average_rating(self, obj):
        total_rating = ReviewRating.objects.filter(product=obj, is_active=True).aggregate(Avg('rating'))
        return round(total_rating['rating__avg'] if total_rating['rating__avg'] else 0.0, 1)
    def get_rating(self, obj):
        queryset = ReviewRating.objects.filter(product=obj, is_active=True).order_by('-create_at')
        serializer = ReviewRatingSerializer(queryset, many=True).data
        total_rating = ReviewRating.objects.filter(product=obj, is_active=True).aggregate(Avg('rating'))

        return {
            'allRating': serializer,
            'average_rating': round(total_rating['rating__avg'] if total_rating['rating__avg'] else 0.0, 1)
        }
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
        
class ProductSameTag(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'product_name', 'old_price', 'new_price', 'image', 'category','slug']
        
class ReviewRatingSerializer(serializers.ModelSerializer):
    userName = serializers.CharField(write_only=True)
    product = serializers.SlugField()
    class Meta:
        model = ReviewRating
        fields = ['id', 'review', 'rating', 'create_at', 'modified_by', 'userName', 'product', 'subject', 'create_by', 'is_active']
  
    def validate(self, attrs):
        return super().validate(attrs)
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = instance.user.username if instance.user else None
        representation['create_by'] = instance.user.username if instance.user else None
        # representation['avtUser'] = instance.user.userprofile.picture_profile.url if instance.user.userprofile.picture_profile and instance.user.role == "User" else ""
        return representation

    def create(self, validated_data):
        user_username = validated_data["userName"]
        product_slug = validated_data["product"]

        user = Account.objects.get(username=user_username)
        product = Product.objects.get(slug=product_slug)

        return ReviewRating.objects.create(
            user=user,
            product=product,
            review=validated_data['review'],
            rating=float(validated_data['rating']),
        )