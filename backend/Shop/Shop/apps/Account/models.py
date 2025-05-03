from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from shortuuidfield import ShortUUIDField
from utils.python import uid, vid
from django.contrib.auth.models import PermissionsMixin

# Create your models here.


class MyAccountManager(BaseUserManager):
    def create_user(self,first_name, last_name,username,  email,phone_number, role, password=None):
        if not email:
            raise ValueError("Can nhap email")
        if not username:
            raise ValueError("Can nhap ten user")
        user = self.model(
            username = username,
            first_name = first_name,
            email = self.normalize_email(email),
            last_name = last_name,
            phone_number = phone_number,
            role = role
        )
        user.set_password(password)
        print("Password before save:", user.password)  
        user.save(using=self._db)
        print("Password after save:", user.password)
        if role == 'Vendor':
            profile = VendorProfile.objects.create(user=user)
        elif role == 'User':
            profile = UserProfile.objects.create(user=user)
        if user.usercart.exists() == False:
            from Shop.apps.carts.models import Cart
            cart = Cart.objects.create(user=user)
            cart.save()
        return user
    
    def create_superuser(self,first_name, last_name,username,phone_number,  email, role, password):
        user = self.create_user(first_name, last_name,username, email,phone_number, role, password)
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save(using=self._db)
        return user
    
    
class Account(AbstractBaseUser, PermissionsMixin):
    class RoleChoices(models.TextChoices):
        USER = 'User', 'User'
        VENDOR = 'Vendor', 'Vendor'
        ADMIN = 'Admin', 'Admin'
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200,unique=True)
    username = models.CharField(max_length=200, unique=True)
    phone_number = models.CharField(max_length=10)
    role = models.CharField(max_length=10, choices=RoleChoices.choices, default=RoleChoices.USER)
    
    
    date_joined = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'phone_number','role']

    objects = MyAccountManager()

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return super().has_perm(perm, obj)

    def has_module_perms(self, app_label):
        return True
    def get_username(self):
        return super().get_username()


class UserProfile(models.Model):
    uid = ShortUUIDField(unique=True, max_length=10, default=uid.generate_uid)
    user = models.OneToOneField(Account, on_delete=models.CASCADE, null=True, blank=True)
    picture_profile = models.ImageField(upload_to='user/avt')
    address = models.CharField(max_length=100)
    
    def __str__(self):
        return self.user.first_name
    
    def full_address(self):
        return f'{self.address}'
    
    
class VendorProfile(models.Model):
    vid = ShortUUIDField(unique=True, max_length=10, default=vid.generate_vid)
    user = models.OneToOneField("Account", on_delete=models.CASCADE, null=True, blank=True)
    picture_profile = models.ImageField(upload_to='vendor/avt')
    address = models.CharField(max_length=100)
    chat_response_time = models.CharField(max_length=50)
    shipping_on_time = models.CharField(max_length=50)
    title_shop = models.CharField(max_length=50)
    description = models.TextField()
    days_return = models.CharField(max_length=100, default="100")
    warranty_period = models.CharField(max_length=100, default="100")
    def __str__(self):
        return self.user.first_name
    
    def full_address(self):
        return f'{self.address}'

