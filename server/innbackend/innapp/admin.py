from django.contrib import admin
from .models import Course, Category
from userpreferences.models import UserPreference

admin.site.register(Course)
admin.site.register(Category)
admin.site.register(UserPreference)
