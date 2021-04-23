from userpreferences.models import UserPreference
from .serializers import CategorySerializer, CourseSerializer, OwnCourseSerializer, UserSerializer, userPreferenceSerializer
from innapp.models import Course, Category, OwnCourse
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view


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
    serializer_class = OwnCourseSerializer

    @api_view(['GET'])
    def current_user(self, request):
        """
        Determine the current user by their token, and return their data
        """
        print(request.user.id)
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    # TODO filter() should only provide the current user
    queryset = OwnCourse.objects.filter().order_by('id')


class UserPreferenceViewSet(viewsets.ModelViewSet):
    queryset = UserPreference.objects.all().order_by('id')
    serializer_class = userPreferenceSerializer
