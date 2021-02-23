from .views import CourseViewSet
from rest_framework.routers import DefaultRouter 

router = DefaultRouter()
router.register(r'', CourseViewSet)
urlpatterns = router.urls