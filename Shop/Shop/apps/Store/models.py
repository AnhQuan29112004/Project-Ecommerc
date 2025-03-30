from django.db import models
from django.db.models import Sum
from Shop.apps.Account.models import Account
from Shop.apps.Category.models import Category
from PIL import Image
from shortuuidfield import ShortUUIDField
from utils.python import sku
# Create your models here.

class Tag(models.Model):
    pass
def product_upload_path(instance,filename):
    return f'photos/products/{instance.slug}/{filename}'
class Product(models.Model):
    product_name = models.CharField(max_length=100, unique=True)
    price = models.FloatField()
    stock = models.IntegerField()
    slug = models.SlugField(max_length=200, unique=True)
    image = models.ImageField(upload_to=product_upload_path, null=False, blank=False)
    is_available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default='')
    description = models.TextField(max_length=200)
    create_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Account,on_delete=models.CASCADE, null=True, blank=True)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, default='', null=True, blank=True)
    product_status = models.CharField(max_length=50, choices=(
        ('Nháp', 'Nháp'),
        ('Từ chối', 'Từ chối'),
        ('Ok', 'Ok'),
        ('Đang duyệt', 'Đang duyệt'),
        ('Hủy', 'Hủy'),
    ), default='Ok')
    
    status = models.BooleanField(default=True) #hiện hoặc ẩn sản phẩm khi còn hay hêt hàng
    sku = ShortUUIDField(unique=True, max_length=6, default=sku.generate_sku) # Mã sku của sản phẩm
    def __str__(self):
        return self.product_name
    
    def get_url(self):
        pass
    
def product_gallery_upload_path(instance,filename):
    return f'photos/products/{instance.product.slug}/gallery/{filename}'

class ProductGallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_gallery_upload_path, null=False, blank=False)
    date_add = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name = 'Product Gallery'
        verbose_name_plural = 'Product Galleries'
    def __str__(self):
        return self.product.product_name
    

class ReviewRating(models.Model):
    review = models.TextField(max_length=200)
    rating = models.FloatField()
    create_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Account,on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey("Product", on_delete=models.CASCADE) 
    subject = models.CharField(max_length=50)
    
    def __str__(self):
        return self.subject
 
    
class VariationManager(models.Manager):
    def color(self):
        return super().filter(variation_category = 'color', is_active = True)
    def size(self):
        return super().filter(variation_category = 'size', is_active = True)
    
    
class Variation(models.Model):
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    variation_category = models.CharField(max_length=50, choices=(
        ('color', 'color'),
        ('size', 'size')
    ))
    variation_value = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now=True)
    objects = VariationManager()
    
    def __unicode__(self):
        return self.product
    
            
         
    