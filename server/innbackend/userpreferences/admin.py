from django.contrib import admin
from .models import UserPreference, OwnCourse
# Register your models here.

admin.site.register(OwnCourse)
admin.site.register(UserPreference)
