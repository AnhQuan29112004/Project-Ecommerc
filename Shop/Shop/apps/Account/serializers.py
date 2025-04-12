from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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