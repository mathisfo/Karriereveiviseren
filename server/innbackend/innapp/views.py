from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from allauth.socialaccount.models import SocialToken
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext as _



class GoogleLogin(SocialLoginView):
  # Authentication will have to be disabled for login view
  authentication_classes = []
  adapter_class = GoogleOAuth2Adapter
  #callback_url = "http://localhost:3000"
  client_class = OAuth2Client

"""
class Logout(APIView):
  #permission_classes = [AllowAny]
  def post(self, request):
    return self.logout(request)

  def logout(self, request):
    try:
      print(request.user.id)
      #access_token = SocialToken.objects.get(account__user=request.user, account__provider='google') 
      #print(access_token)
    except (AttributeError, ObjectDoesNotExist):
      pass


    return Response({"success": _("Successfully logged out.")}, status=status.HTTP_200_OK)
"""
