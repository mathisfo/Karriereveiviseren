from django.urls import include, path
from rest_framework.routers import DefaultRouter
from activity.views import CourseViewSet, CategoryViewSet, OwnCourseViewSet
from userpreferences.views import UserViewSet
from userpreferences.views import UserPreferenceViewSet

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
