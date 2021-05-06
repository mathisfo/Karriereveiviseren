from django.shortcuts import render
from rest_framework import viewsets
from userpreferences.models import UserPreference
from innapp.api.serializers import UserPreferenceSerializer
from innapp.api.serializers import UserSerializer
from django.contrib.auth.models import User


class UserPreferenceViewSet(viewsets.ModelViewSet):
    queryset = UserPreference.objects.all()
    serializer_class = UserPreferenceSerializer
    filter_fields = ('user')


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
