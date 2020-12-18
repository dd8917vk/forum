
from rest_framework import serializers
from .models import Category, Posts, Comments, Answers
from django.contrib.auth.models import User

class ViewCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Posts
        fields = '__all__'

class CreatePostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ('title', 'body')

class ViewCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'

class CreateCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('body',)

class CreateAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ('body',)

class ViewAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = '__all__'

class PostAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ('body',)