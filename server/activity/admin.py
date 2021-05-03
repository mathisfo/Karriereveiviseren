from django.contrib import admin

from activity.models import Course, OwnCourse, Category

# Register your models here.

admin.site.register(Course)
admin.site.register(OwnCourse)
admin.site.register(Category)
