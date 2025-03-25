from django.contrib.auth.backends import ModelBackend
from .models import Account

class UserBackend(ModelBackend): 
    def authenticate(self, *args,**kwargs):
        try:
            user = Account.objects.get(email=kwargs.get('username'))
            
        except Account.DoesNotExist:
            return None
        if user.check_password(kwargs.get('password')):
            if user and not user.is_superuser:
                return user
        else:
            return None
        
class AdminBackend(ModelBackend): 
    def authenticate(self, *args,**kwargs):
        try:
            user = Account.objects.get(email=kwargs.get('username'))
            
        except Account.DoesNotExist:
            return None
        if user.check_password(kwargs.get('password')):
            if user and user.is_superuser:
                return user
        else:
            return None