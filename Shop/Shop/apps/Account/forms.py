from django import forms
from .models import Account
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate

class RegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    confirm_password = forms.CharField(widget=forms.PasswordInput())
    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'username', 'phone_number', 'email']
        widgets={
            'email': forms.EmailInput()
        }
        
    def clean(self):
        data = super().clean()
        if (data.get('password') != data.get('confirm_password')):
            raise forms.ValidationError("Password not matching")
        return data

        
class CustormAuthenticationForm(AuthenticationForm):
    username = forms.EmailField(widget=forms.EmailInput(attrs={"class": "form-control"}))

    def clean(self):
        email = self.cleaned_data.get("username")
        password = self.cleaned_data.get("password")
        if email and password:
            user = authenticate(username=email, password=password)
            
            if user is None:
                raise forms.ValidationError("Email hoặc mật khẩu không đúng.")
            self.user_cache = user

        return self.cleaned_data

    def get_user(self):
        return self.user_cache