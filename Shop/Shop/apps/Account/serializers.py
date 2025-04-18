from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from Shop.apps.Store.serializer import ProductSerializer
from Shop.apps.Account.models import Account, VendorProfile, UserProfile
class CustormTokenObtainPair(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role  
        token['email'] = user.email
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        return {
            "access":data.get("access"),
            "refresh":data.get("refresh")
        }
        
        
class AccountInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'role']

class VendorSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()
    user = AccountInfoSerializer(read_only=True) 
    def get_name(self, obj):
        return obj.user.get_full_name()
    def get_product_count(self, obj):
        return obj.vendorProduct.count()
    def get_product(self, obj):
        products = obj.vendorProduct.all()
        return ProductSerializer(products, many=True).data
    class Meta:
        model = VendorProfile
        fields = ['id', 'name', 'user', 'product_count', 'product']