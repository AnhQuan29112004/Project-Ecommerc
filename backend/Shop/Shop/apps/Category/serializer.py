from rest_framework.serializers import ModelSerializer, SerializerMethodField, CharField, IntegerField, ListField
from Shop.apps.Category.models import Category

class CategoriesSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'slug_category', 'description', 'cate_images']