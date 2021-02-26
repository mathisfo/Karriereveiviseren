from innapp.models import Course
from .serializers import innappSerializer
from rest_framework import viewsets


class CourseViewSet(viewsets.ModelViewSet):
    # API endpoint that allows all courses to be viewed or edited
    queryset = Course.objects.all().order_by('id')
    serializer_class = innappSerializer
