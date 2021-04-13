from innapp.models import Course
from userpreferences.models import UserPreference
from .serializers import CategorySerializer, userPreferenceSerializer, UserSerializer
from innapp.models import Course, Category
from .serializers import CourseSerializer, CategorySerializer
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.models import User


class CourseViewSet(viewsets.ModelViewSet):
    # API endpoint that allows all courses to be viewed or edited
    queryset = Course.objects.all().order_by('id')
    serializer_class = CourseSerializer


class UserPreferenceViewSet(viewsets.ModelViewSet):
    queryset = UserPreference.objects.all().order_by('id')
    serializer_class = userPreferenceSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    serializer_class = CourseSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer
