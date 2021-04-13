from django.contrib import admin
from .models import Course
from userpreferences.models import UserPreference

admin.site.register(Course)
admin.site.register(UserPreference)
