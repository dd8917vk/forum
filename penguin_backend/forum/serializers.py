from rest_framework import serializers
#import base64
#from drf_extra_fields.fields import Base64ImageField
from rest_framework.validators import UniqueValidator
from .models import Category, Posts, Comments
from django.contrib.auth.models import User



class ViewCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ViewPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ('title', 'body')


class ViewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('body',)
