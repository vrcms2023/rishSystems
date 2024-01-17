from rest_framework import serializers
from .models import *


class CaseStudiesSerializer(serializers.ModelSerializer):
     class Meta:
        fields = '__all__'
