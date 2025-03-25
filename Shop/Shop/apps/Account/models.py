from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from shortuuidfield import ShortUUIDField

# Create your models here.


class MyAccountManager(BaseUserManager):
    def create_user(self,first_name, last_name,username,  email,phone_number, password=None):
        if not email:
            raise ValueError("Can nhap email")
        if not username:
            raise ValueError("Can nhap ten user")
        user = self.model(
            username = username,
            first_name = first_name,
            email = self.normalize_email(email),
            last_name = last_name,
            phone_number = phone_number
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,first_name, last_name,username,phone_number,  email, password):
        user = self.create_user(first_name, last_name,username,phone_number,  email, password)
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user
    
    
class Account(AbstractBaseUser):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200,unique=True)
    username = models.CharField(max_length=200, unique=True)
    phone_number = models.CharField(max_length=10)
    
    
    date_joined = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = MyAccountManager()

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
    def get_username(self):
        return super().get_username()
    
    
class UserProfile(models.Model):
    uid = ShortUUIDField(unique=True, max_length=10, prefix='user', alphabet='0123456789')
    user = models.OneToOneField("Account", on_delete=models.CASCADE)
    picture_profile = models.ImageField(upload_to='user/avt')
    city = models.CharField(max_length=60)
    country = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    
    def __str__(self):
        return self.user.first_name
    
    def full_address(self):
        return f'{self.address}'
    
    
class VendorProfile(models.Model):
    vid = ShortUUIDField(unique=True, max_length=10, prefix='ven', alphabet='0123456789')
    user = models.OneToOneField("Account", on_delete=models.CASCADE)
    picture_profile = models.ImageField(upload_to='vendor/avt')
    city = models.CharField(max_length=60)
    country = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    chat_response_time = models.CharField(max_length=50)
    shipping_on_time = models.CharField(max_length=50)
    title_shop = models.CharField(max_length=50)
    description = models.TextField()
    days_return = models.CharField(max_length=100, default="100")
    def __str__(self):
        return self.user.first_name
    
    def full_address(self):
        return f'{self.address}'

