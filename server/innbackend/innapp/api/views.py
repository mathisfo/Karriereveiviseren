from innapp.models import Course 
from .serializers import innappSerializer
from rest_framework import viewsets

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = innappSerializer
    queryset = Course.objects.all()