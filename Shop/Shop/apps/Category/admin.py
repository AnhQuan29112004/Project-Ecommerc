from django.contrib import admin
from .models import Category
from django.utils.safestring import mark_safe
# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    def category_images(self, obj):
        if obj.cate_images: 
            return mark_safe(f'<img src="{obj.cate_images.url}" width="50px" />')
        return "No Image"   
    list_display = ["category_name", "slug_category", "description", "category_images", "vendor"]
    list_filter = ["category_name", "vendor"]
    prepopulated_fields = {"slug_category":["category_name"]}

admin.site.register(Category, CategoryAdmin)