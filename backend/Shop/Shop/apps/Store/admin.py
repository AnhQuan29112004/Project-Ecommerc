from django.contrib import admin
from .models import Product, Variation, ReviewRating
from django.utils.safestring import mark_safe
# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    def view_image(self, obj):
        if obj.image: 
            return mark_safe(f'<img src="{obj.image.url}" width="50px" />')
        return "No Image" 

    list_display = ['product_name','new_price','stock','create_at','modified_by', 'view_image']
    prepopulated_fields = {'slug':['product_name']}
    
class VariationAdmin(admin.ModelAdmin):
    list_display=['product', 'variation_category', 'variation_value', 'is_active', 'create_at']
    list_editable = ['is_active']

admin.site.register(Product, ProductAdmin)
admin.site.register(Variation,VariationAdmin)
admin.site.register(ReviewRating)