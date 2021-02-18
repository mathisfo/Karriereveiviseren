from rest_framework import serializers 
from innapp.models import Course 

class innappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course 
        fields = ('id', 'title', 'description', 'date')