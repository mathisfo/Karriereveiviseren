from django.db import models
from django.utils.timezone import now
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User


class Category(models.Model):
    category = models.CharField('kategori', max_length=100, default="")

    def __str__(self):
        return self.category


class OwnCourse(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owner")
    title = models.CharField('tiltak', max_length=120)
    startDate = models.DateTimeField(
        'start dato', default=now)
    endDate = models.DateTimeField('slutt dato', default=now)

    description = models.TextField('beskrivelse')
    shortDescription = models.CharField(
        'kort beskrivelse', max_length=150, default="")

    goal = models.CharField("Mitt mål", max_length=150, default="")

    def __str__(self):
        return str(self.title)


class Course(models.Model):
    title = models.CharField('tiltak', max_length=120)
    startDate = models.DateTimeField(
        'start dato', default=now)
    endDate = models.DateTimeField('slutt dato', default=now)
    description = models.TextField('beskrivelse')
    # when restriction is 0, there is no restriction
    shortDescription = models.CharField(
        'kort beskrivelse', max_length=150, default="")
    restriction = models.IntegerField('spor', validators=[
        MinValueValidator(0)
    ], default=0)
    # if we move to postgres, we can use arrayfield here
    # other = models.ArrayField()
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="category1")
    classroom = models.CharField('link', max_length=150, default="")

    def __str__(self):
        return self.title

    def courseLifetime(self):
        return self.endDate - self.startDate

    def hasRestriction(self):
        return False if self.restriction == 0 else True
