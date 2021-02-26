from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet

router = DefaultRouter()
router.register(r'course', CourseViewSet)

# Setup automatic URL routing
urlpatterns = [
    # Default /api
    path('', include(router.urls)),
]
