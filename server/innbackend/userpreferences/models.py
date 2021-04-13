from django.db import models
from django.contrib.auth.models import User
from innapp.models import Course


# Create your models here.


class UserPreference(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    selected = models.ManyToManyField(Course)
    #owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.selected)
