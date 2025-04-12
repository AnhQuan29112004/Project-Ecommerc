from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import RegisterForm, CustormAuthenticationForm
from .models import Account
from django.contrib import messages,auth
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from Shop.apps.Account.authentication import CustomJWTAuthentication
from Shop.apps.Account.serializers import CustormTokenObtainPair
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
import pdb
import json


# Create your views here.
class RegisterAPIView(APIView):
    permission_classes = [AllowAny]
    # def post(self, request, *args, **kwargs):
    #     print(request.POST)
    #     form = RegisterForm(data=request.data)
    #     if form.is_valid():
    #         user = Account.objects.create_user(
    #             email=form.cleaned_data['email'],
    #             password=form.cleaned_data['password'],
    #             username=form.cleaned_data['username'],
    #             last_name=form.cleaned_data['last_name'],
    #             first_name=form.cleaned_data['first_name'],
    #             phone_number=form.cleaned_data['phone_number'],
    #             role=form.cleaned_data['role']
    #         )
    #         user.save()
    #         return Response({"message": "User registered successfully", 'next':reverse("login"), 'code':"SUCCESS", 'status':201}, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response({"error": form.errors,'code':"ERROR", 'status':400}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        print("POST",request.POST)
        form = RegisterForm(data=request.data)
        data = request.data
        if (form.is_valid()):
            print(form.cleaned_data)
            user = Account.objects.create_user(
                first_name = data.get('first_name'), 
                last_name = data.get('last_name'),
                username = data.get('username'),  
                email = data.get('email'),
                phone_number = data.get('phone_number'), 
                role = data.get('role'),
                password = data.get('password')
            )
            user.save()
            breakpoint()
            return Response({
                    "message":"Register successfully",
                    "status": 201,
                    "code":"SUCCESS"
                }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "message":"ERROR"
            },status=status.HTTP_400_BAD_REQUEST)

def Register(request):
    form = RegisterForm()
    return render(request, 'Account/register.html', {
        'form':form
    })
       
class LoginAPIView(TokenObtainPairView):
    serializer_class = CustormTokenObtainPair
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        try:
            user = Account.objects.get(email=request.data.get("email"))
        except Account.DoesNotExist:
            raise ValueError("User isn't exist")
        if(serializer.is_valid()):
            data = serializer.validated_data
            response = Response({
                "status":200,
                "message":"Login successfully",
                "access":data.get("access"),
                "code":"SUCCESS",
                "role":user.role
            },status=status.HTTP_200_OK)
            
            response.set_cookie(
                key='refresh',
                value=data.get("refresh"),
                httponly=True, 
                secure=True,   
                samesite='Lax', 
            )
            response.set_cookie(
                key='access',
                value=data.get("access"),
                httponly=True, 
                secure=True,   
                samesite='Lax', 
            )
            return response
        else:
            return Response({
                "message": "Login failed",
                "error": serializers.errors,
                'status': 400,
                'code':"ERROR",
                
            },status=status.HTTP_400_BAD_REQUEST)
        
        
def login(request):
    form = CustormAuthenticationForm()
    return render(request, 'Account/login.html', {'form': form})


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomJWTAuthentication]
    
    def post(self,request):
        try:
            response = Response({
                "message": "Logout successfully", 
                "code": "SUCCESS",
                "next": reverse("loginview")
            }, status=status.HTTP_200_OK)
            
            response.delete_cookie('refresh')
            response.delete_cookie('access')
            return response
            
        except Exception as e:
            return Response({"error": str(e),"code":"ERROR"}, status=status.HTTP_400_BAD_REQUEST)
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            data = {
                "status": 200,
                "message": "Token refreshed successfully",
                "access_token": response.data.get("access"),
                "code": "SUCCESS",
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            data = {
                "status": 400,
                "message": f"Failed to refresh token: {str(e)}",
                "details": "Invalid or expired refresh token",
                "code": "ERROR",
            }
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        
class GetUserAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomJWTAuthentication]
    def get(self, request):
        try:
            user = request.user
            print(user.is_authenticated)
            data = {
                'email': user.email,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone_number': user.phone_number,
                'birth': user.birth,
                'check': user.is_authenticated,
            }
            return Response(data + {"code":"SUCCESS"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e),'code':"ERROR"}, status=status.HTTP_400_BAD_REQUEST)
        