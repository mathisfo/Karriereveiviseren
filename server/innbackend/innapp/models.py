from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    date = models.DateField()
    def __str__(self):
        return self.title