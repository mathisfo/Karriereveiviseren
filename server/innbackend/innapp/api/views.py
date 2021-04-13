from innapp.models import Course
from userpreferences.models import UserPreference
from .serializers import innappSerializer, userPreferenceSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.models import User


class CourseViewSet(viewsets.ModelViewSet):
    # API endpoint that allows all courses to be viewed or edited
    queryset = Course.objects.all().order_by('id')
    serializer_class = innappSerializer


class UserPreferenceViewSet(viewsets.ModelViewSet):
    queryset = UserPreference.objects.all().order_by('id')
    serializer_class = userPreferenceSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
