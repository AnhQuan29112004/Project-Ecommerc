from django.shortcuts import render, redirect
from .forms import RegisterForm, CustormAuthenticationForm
from .models import Account
from django.contrib import messages,auth
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
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
            user.is_active = True
            user.save()
            
            
            current_site = get_current_site(request)
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
        next = request.GET.get('next','/')
        print("next:",next)
        data = json.loads(request.body)
        form = CustormAuthenticationForm(request, data)
        if form.is_valid():
            user = form.get_user()
            if user:
                auth.login(request, user)
                messages.success(request, "Login Successful!!")
            storage = messages.get_messages(request)
            message_list = [message.message for message in storage]
            return JsonResponse({'success': 'Login Successful!!',"messages": message_list, "user":request.user.username, "next": '/'})
        else:
            print(form.errors)  
            messages.error(request, "Login Failed!!")
            storage = messages.get_messages(request)
            message_list = [message.message for message in storage]
            return JsonResponse({"error": "Login Failed", "details": form.errors,"messages": message_list })

    form = CustormAuthenticationForm()
    return render(request, 'Account/login.html', {'form': form})


def logout(request):
    auth.logout(request)
    return redirect("login")