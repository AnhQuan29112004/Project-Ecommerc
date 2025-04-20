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
        fields = ['first_name', 'last_name', 'username', 'phone_number', 'email','role']
        widgets={
            'email': forms.EmailInput(),
        }
        
    def clean(self):
        data = super().clean()
        if (data.get('password') != data.get('confirm_password')):
            raise forms.ValidationError("Password not matching")
        return data

        
class CustormAuthenticationForm(AuthenticationForm):
    username = forms.EmailField(widget=forms.EmailInput(attrs={"class": "form-control"}))