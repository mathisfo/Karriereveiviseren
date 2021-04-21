from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, UserViewSet, CategoryViewSet, UserPreferenceViewSet, OwnCourseViewSet

router = DefaultRouter()
router.register(r'course', CourseViewSet)
router.register(r'owncourse', OwnCourseViewSet)
router.register(r'userpreferences', UserPreferenceViewSet)
router.register(r'users', UserViewSet)
router.register(r'category', CategoryViewSet)
# Setup automatic URL routing
urlpatterns = [
    # Default /api
    path('', include(router.urls)),
]
