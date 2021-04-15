from innapp.models import Course
from userpreferences.models import UserPreference
from innapp.models import Course, Category

from rest_framework import serializers
from django.contrib.auth.models import User


class CourseSerializer(serializers.ModelSerializer):
    category = serializers.CharField(
        source="category.category", read_only=True)

    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'startDate', 'endDate',
                  'description', 'shortDescription', 'restriction', 'category', 'classroom')


class userPreferenceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserPreference
        fields = ('url', 'id', 'user', 'selected')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',
                  'password', 'is_superuser')


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('url', 'id', 'category')
