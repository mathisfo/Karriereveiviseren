from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, UserPreferenceViewSet, UserViewSet

router = DefaultRouter()
router.register(r'course', CourseViewSet)
router.register(r'userpreferences', UserPreferenceViewSet)
router.register(r'users', UserViewSet)

# Setup automatic URL routing
urlpatterns = [
    # Default /api
    path('', include(router.urls)),
]
