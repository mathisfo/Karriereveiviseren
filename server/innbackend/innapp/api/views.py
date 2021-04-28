from userpreferences.models import UserPreference
from .serializers import CategorySerializer, CourseSerializer, OwnCourseSerializer, UserSerializer, UserPreferenceSerializer
from innapp.models import Course, Category, OwnCourse
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, action


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

    queryset = OwnCourse.objects.all().order_by('id')
    
    # Makes sure that the /owncourses endpoint only gives owncourses to the logged in user
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class UserPreferenceViewSet(viewsets.ModelViewSet):
    queryset = UserPreference.objects.all()
    serializer_class = UserPreferenceSerializer
    filter_fields = ('user')