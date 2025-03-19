from django.shortcuts import render
from .forms import RegisterForm
from .models import Account
from django.contrib import messages,auth
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.
def Register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = Account.objects.create_user(
                first_name=data['first_name'], 
                last_name=data['last_name'], 
                email=data['email'], 
                username=data['username'], 
                phone_number = data['phone_number'],
                password=data['password']
            )
            user.save()
            messages.success(request,"Register Successful!!")
        else:
            messages.error(request,"Register Fail!!")
    else:
        form = RegisterForm()
    return render(request, 'Account/register.html', {
        'form':form
    })
       
       
def login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            if user is not None:
                auth.login(request, user)
                messages.success(request, "Login Successful!!")
            else:
                messages.error(request, "Login Fail!!")
        else:
            messages.error(request, "Login Fail!!")
    else:
        form = AuthenticationForm()
    return render(request, 'Account/login.html')