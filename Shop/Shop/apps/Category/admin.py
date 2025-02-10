from django.contrib import admin
from .models import Category
# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ["category_name"]
    prepopulated_fields = {"slug_category":["category_name"]}

admin.site.register(Category, CategoryAdmin)