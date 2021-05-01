from innapp.models import Course
from userpreferences.models import UserPreference
from innapp.models import Course, Category
from userpreferences.models import OwnCourse

from rest_framework import serializers
from django.contrib.auth.models import User
from collections import OrderedDict


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

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    class Meta:
        model = Category
        fields = ('url', 'id', 'category', 'icon')


class UserPreferenceSerializer(serializers.ModelSerializer):
    
    user = serializers.PrimaryKeyRelatedField(
        many=False, queryset=User.objects.all()
    )
    selected = CourseSerializer(many=True)

    class Meta:
        model = UserPreference
        fields = ('url', 'user', 'selected')

    def create(self, validated_data):
        selected_courses = validated_data.pop('selected', [])
        userPreference, created = UserPreference.objects.get_or_create(
            user=self.context['request'].user)
        if(not created):
            print(userPreference.selected.all())
        selected = selected_courses[0]
        course = Course.objects.get(title=selected['title'])
        if course in userPreference.selected.all():
            instance = userPreference.selected.get(title=course.title)
            userPreference.selected.remove(instance)
        else:
            userPreference.selected.add(course)

        return userPreference
