from django.db import models
from ..Store.models import Product, Variation
from Shop.apps.Account.models import Account
# Create your models here.
class Cart(models.Model):
    cart_id = models.CharField(max_length=250, blank=True)
    date_add = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.cart_id
    
class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    cart = models.ForeignKey("Cart",on_delete=models.CASCADE)
    quantity = models.IntegerField()
    is_active = models.BooleanField(default=True)
    variation = models.ManyToManyField(Variation,blank=True)
    def total_item(self):
        return float(self.product.new_price * self.quantity)
    def __str__(self):
        return self.product.product_name
    
    
class WishList(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date_add = models.DateTimeField(auto_now_add=True)