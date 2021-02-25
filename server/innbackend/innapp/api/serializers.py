from innapp.models import Course

from rest_framework import serializers


class innappSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'startDate', 'endDate',
                  'description', 'restriction')
