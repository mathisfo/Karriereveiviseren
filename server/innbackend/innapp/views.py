from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import HttpResponse

class GoogleLogin(SocialLoginView):
  # Authentication will have to be disabled for login view
  authentication_classes = []
  adapter_class = GoogleOAuth2Adapter
  #callback_url = "http://localhost:3000"
  client_class = OAuth2Client

class Logout(APIView):
  permission_classes = [AllowAny]
  def post(self, request):
    
    response = HttpResponse("http://localhost:3000/")
    response.delete_cookie("innapp")
    response.delete_cookie("user_refresh_token")
    response.delete_cookie("sessionid")
    return response