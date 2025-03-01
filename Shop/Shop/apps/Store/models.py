from django.db import models
from Shop.apps.Account.models import Account
from Shop.apps.Category.models import Category
from PIL import Image
# Create your models here.
class Product(models.Model):
    product_name = models.CharField(max_length=100, unique=True)
    price = models.FloatField()
    stock = models.IntegerField()
    slug = models.SlugField(max_length=200, unique=True)
    image = models.ImageField(upload_to='photos/products')
    is_available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default='')
    description = models.TextField(max_length=200)
    create_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.product_name
    
    def get_url(self):
        pass
    

class ReviewRating(models.Model):
    review = models.TextField(max_length=200)
    rating = models.FloatField()
    create_at = models.DateTimeField(auto_now_add=True)
    modified_by = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Account,on_delete=models.CASCADE)
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
    