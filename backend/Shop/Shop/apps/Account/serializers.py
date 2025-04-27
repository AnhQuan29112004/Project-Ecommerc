from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
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
    def get_name(self, obj):
        return obj.VendorProfile.get_full_name()
    def get_product_count(self, obj):
        return obj.vendorProduct.count()
    
    def to_representation(self, instance):

        representation = super().to_representation(instance)
        VendorProfile = AccountInfoSerializer(instance.VendorProfile,read_only=True, many=False).data
        representation = {**representation, **VendorProfile}
        return representation
    class Meta:
        model = VendorProfile
        fields = ['id','vid', 'name', 'product_count','address','chat_response_time','shipping_on_time','title_shop','description','days_return','warranty_period','picture_profile']