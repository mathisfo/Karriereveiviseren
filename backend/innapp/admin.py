from django.contrib import admin
from .models import Course, Category, OwnCourse


admin.site.register(Course)
admin.site.register(OwnCourse)
admin.site.register(Category)
