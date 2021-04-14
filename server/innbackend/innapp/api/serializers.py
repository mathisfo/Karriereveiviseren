from innapp.models import Course, Category

from rest_framework import serializers


class CourseSerializer(serializers.ModelSerializer):
    category = serializers.CharField(
        source="category.category", read_only=True)

    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'startDate', 'endDate',
                  'description', 'shortDescription', 'restriction', 'category')


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('url', 'id', 'category')
