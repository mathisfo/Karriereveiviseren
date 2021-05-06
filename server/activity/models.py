from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.core.validators import MinValueValidator


ICON_CHOICES = [
    ("user", "Bruker"),
    ("briefcase", "Koffert"),
    ("graduation", "Utdanning"),
    ("university", "Universitet"),
    ("users", "Samfunn"),
    ("building outline", "Leilighet"),
    ("lightbulb", "Lyspære")
]


class Category(models.Model):
    category = models.CharField('kategori', max_length=100, default="")
    icon = models.CharField(choices=ICON_CHOICES,
                            default="Bruker", max_length=30)

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
    classroom = models.URLField('link', max_length=200, default="")

    def __str__(self):
        return self.title

    def courseLifetime(self):
        return self.endDate - self.startDate

    def hasRestriction(self):
        return False if self.restriction == 0 else True
