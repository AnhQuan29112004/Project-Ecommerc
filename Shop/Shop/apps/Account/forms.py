from django import forms
from .models import Account

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
    
    
class LoginForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    class Meta:
        model = Account
        fields = ['username']
        
    def clean(self):
        data = super().clean()
        return data