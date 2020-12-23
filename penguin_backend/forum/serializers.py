from rest_framework import serializers
#import base64
#from drf_extra_fields.fields import Base64ImageField
from rest_framework.validators import UniqueValidator
from .models import Category, Post, Comment, Answer
from django.contrib.auth.models import User



class ViewCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ViewPostSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'date_posted', 'likes', 'author', 'category') 

class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'body')


class ViewCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('body',)

class ViewAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class CreateAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('body',)
