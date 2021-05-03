from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.core.validators import MinValueValidator
from activity.models import Course, OwnCourse


# Create your models here.


class UserPreference(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    selected = models.ManyToManyField(Course, blank=True, null=True, default=[])
    
    def __str__(self):

        return str(self.user) + ' sin plan'
