from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.core.validators import MinValueValidator
from innapp.models import Course, OwnCourse


# Create your models here.


class UserPreference(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, default="")
    selected = models.ManyToManyField(Course, blank=True, default=[])
    # owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    # selectedOwn = models.ManyToManyField(
    #    OwnCourse, blank=True, default=[])

    def __str__(self):

        return str(self.user) + ' sin plan'
