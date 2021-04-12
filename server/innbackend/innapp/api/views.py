from innapp.models import Course, Category
from .serializers import CourseSerializer, CategorySerializer
from rest_framework import viewsets


class CourseViewSet(viewsets.ModelViewSet):
    # API endpoint that allows all courses to be viewed or edited
    queryset = Course.objects.all().order_by('id')
    serializer_class = CourseSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer
