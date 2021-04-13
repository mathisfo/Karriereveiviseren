from innapp.models import Course
from userpreferences.models import UserPreference
from rest_framework import serializers
from django.contrib.auth.models import User



class innappSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'startDate', 'endDate',
                  'description', 'restriction')


class userPreferenceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserPreference
        fields = ('url', 'id', 'user', 'selected')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',
                  'password', 'is_superuser')
