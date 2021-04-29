from innapp.models import Course
from userpreferences.models import UserPreference
from innapp.models import Course, Category
from userpreferences.models import OwnCourse

from rest_framework import serializers
from django.contrib.auth.models import User


class userPreferenceSerializer(serializers.HyperlinkedModelSerializer):
    lookup_field = 'user'

    class Meta:
        model = UserPreference
        fields = ('url', 'id', 'user', 'selected')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'id', 'first_name', 'last_name',
                  'password', 'is_superuser')


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'startDate', 'endDate',
                  'description', 'shortDescription', 'restriction', 'category', 'classroom')


class OwnCourseSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        return OwnCourse.objects.create(**validated_data)

    class Meta:
        model = OwnCourse
        fields = ('url', 'id', 'user', 'title', 'startDate', 'endDate',
                  'description', 'shortDescription', 'goal')


class CategorySerializer(serializers.HyperlinkedModelSerializer):

    #course = CourseSerializer(read_only=True, many=True)

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    class Meta:
        model = Category
        fields = ('url', 'id', 'category')
