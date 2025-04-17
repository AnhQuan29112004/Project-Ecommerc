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
class LogoutAPI(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomJWTAuthentication]

    def post(self, request):
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


class RegisterAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        form = RegisterForm(data=request.data)
        if form.is_valid():
            user = Account.objects.create_user(
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password'],
                username=form.cleaned_data['username'],
                last_name=form.cleaned_data['last_name'],
                first_name=form.cleaned_data['first_name'],
                phone_number=form.cleaned_data['phone_number'],
                role = form.cleaned_data['role'],
            )
            user.save()
            return Response({"message": "User registered successfully", 'next':reverse("login"), 'code':"SUCCESS", 'status':201}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": form.errors,'code':"ERROR", 'status':400}, status=status.HTTP_400_BAD_REQUEST)


def loginview(request):
    return render(request, 'Account/login.html')
def registerview(request):
    form = RegisterForm()
    return render(request, 'Account/register.html', {'form': form})

class GetUserView(APIView):
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
            return Response({
                    "message": "Get user successfully",
                    "code":"SUCCESS",
                    "status":200,
                    "data":data
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e),'code':"ERROR","status":400}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPI(TokenObtainPairView):
    serializer_class = CustormTokenObtainPair

    def post(self, request, *args, **kwargs):
        print("DATA :",request.data)
        user = Account.objects.get(email=request.data.get('email'))
        serializer = self.get_serializer(data=request.data)
        if (serializer.is_valid()):
            data = serializer.validated_data
            response = Response({
                    "message": "Login successfully",
                    "data": {
                        "accessToken": data.get("access"),
                        "refreshToken": data.get("refresh"),
                    },
                    'status': 200,
                    'role': user.role,
                    'code':"SUCCESS"
                }, status=status.HTTP_200_OK)
            response.set_cookie(key='access', value=data.get("access"), httponly=True, samesite='None', secure=True)
            response.set_cookie(key='refresh', value=data.get("refresh"), httponly=True, samesite='None', secure=True)
            
            return response
        else:
            return Response({
                "message": "Login failed",
                "error": serializer.errors,
                'status': 400,
                'code':"ERROR",
                
            },status=status.HTTP_400_BAD_REQUEST)
            
class CustomTokenRefreshView(TokenRefreshView):
    def get(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh')
            if not refresh_token:
                raise ValueError("No refresh token found in cookies")
            
            serializer = self.get_serializer(data={'refresh': refresh_token})

            try:
                serializer.is_valid(raise_exception=True)
            except TokenError as e:
                raise ValueError("Invalid refresh token")

            response_data = serializer.validated_data

            data = {
                "status": 200,
                "message": "Token refreshed successfully",
                "accessToken": response_data.get("access"),
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
        