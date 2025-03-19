from django.shortcuts import render, redirect
from .forms import RegisterForm, CustormAuthenticationForm
from .models import Account
from django.contrib import messages,auth
from django.contrib.auth.forms import AuthenticationForm
from django.http import JsonResponse
import pdb
import json


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
        data = json.loads(request.body)
        form = CustormAuthenticationForm(request, data)
        if form.is_valid():
            user = form.get_user()
            if user is not None:
                auth.login(request, user)
                messages.success(request, "Login Successful!!")
                return JsonResponse({'success': 'Login Successful!!'}, status=200)
        else:
            print(form.errors)  # In lỗi ra terminal
            return JsonResponse({"error": "Login Failed", "details": form.errors}, status=400)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({"error": "Invalid request"}, status=400)

    form = CustormAuthenticationForm()
    return render(request, 'Account/login.html', {'form': form})