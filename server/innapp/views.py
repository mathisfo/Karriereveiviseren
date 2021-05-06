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
    client_class = OAuth2Client
