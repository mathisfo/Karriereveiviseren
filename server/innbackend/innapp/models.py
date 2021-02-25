from django.db import models
from django.utils.timezone import now


class Course(models.Model):
    title = models.CharField('tiltak', max_length=120)
    startDate = models.DateTimeField(
        'start dato', default=now)
    endDate = models.DateTimeField('slutt dato', default=now)
    description = models.TextField('beskrivelse')
    # when restriction is 0, there is no restriction
    restriction = models.IntegerField('spor', default=0)
    # if we move to postgres, we can use arrayfield here
    #other = models.ArrayField()

    def __str__(self):
        return self.title

    def courseLifetime(self):
        return self.endDate - self.startDate

    def hasRestriction(self):
        return False if self.restriction == 0 else True
