from django.db import models
from Shop.apps.Account.models import VendorProfile
# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=50, unique=True)
    slug_category = models.SlugField(unique=True, max_length=60)
    description = models.TextField(max_length=255, blank=True)
    cate_images = models.ImageField(upload_to="photos/categories", blank=True)
    vendor = models.OneToOneField(VendorProfile, on_delete=models.CASCADE, null=True, blank=True)
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        
    
    def __str__(self):
        return self.category_name