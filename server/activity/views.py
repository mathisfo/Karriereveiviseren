from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from innapp.api.serializers import CategorySerializer, CourseSerializer, OwnCourseSerializer, UserPreferenceSerializer, UserSerializer
from activity.models import Course, Category, OwnCourse
from rest_framework.decorators import api_view, action


class CourseViewSet(viewsets.ModelViewSet):
    # API endpoint that allows all courses to be viewed or edited
    queryset = Course.objects.all().order_by('id')
    serializer_class = CourseSerializer


class OwnCourseViewSet(viewsets.ModelViewSet):
    # API endpoint that allows all courses to be viewed or edited
    serializer_class = OwnCourseSerializer

    @api_view(['GET'])
    def current_user(self, request):
        print(request.user.id)
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    queryset = OwnCourse.objects.all().order_by('id')

    # Makes sure that the /owncourses endpoint only gives owncourses to the logged in user
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer
