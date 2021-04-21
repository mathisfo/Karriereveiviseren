from userpreferences.models import UserPreference
from .serializers import CategorySerializer, CourseSerializer, OwnCourseSerializer, UserSerializer, userPreferenceSerializer
from innapp.models import Course, Category, OwnCourse
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.models import User


class CourseViewSet(viewsets.ModelViewSet):
    # API endpoint that allows all courses to be viewed or edited
    queryset = Course.objects.all().order_by('id')
    serializer_class = CourseSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer


class OwnCourseViewSet(viewsets.ModelViewSet):
    # API endpoint that allows all courses to be viewed or edited
    queryset = OwnCourse.objects.all().order_by('id')
    serializer_class = OwnCourseSerializer


class UserPreferenceViewSet(viewsets.ModelViewSet):
    queryset = UserPreference.objects.all().order_by('id')
    serializer_class = userPreferenceSerializer
