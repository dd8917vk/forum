from django.shortcuts import render, redirect
from .serializers import *
from django.http import HttpResponse, Http404
from .models import Category, Posts
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import filters
from rest_framework import generics
from django.contrib.auth.models import User
# from rest_framework.permissions import IsAuthenticacted, AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token
from rest_framework import status

# Create your views here.
"""
/categories/
/posts/ # gets all the posts
/posts/categoryid/
/posts/id/ Get, update, delete, POST -> 
/post-comments/<postid>
"""

class CategoriesView(APIView):
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = ViewCategorySerializer(categories, context={"request": request}, many=True)
        return Response(serializer.data)

class PostsView(APIView):
    def get(self, request, format=None):
        posts = Posts.objects.all()
        serializer = PostSerializer(posts, context={"request": request}, many=True)
        return Response(serializer.data)

#adding a post under a category /forum/create-post/<CATEGORY_ID>
class PostCategoryView(APIView):
    def post(self, request, pk, format=None):
        category_id = Category.objects.get(pk=pk)
        serializer = CreatePostsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user, category=category_id)
            return Response({"message":"created post"})
        else:
            return Response({"message":"Could NOT create post"})

#This creates a comment under a post like so /forum/post-comment/<POST ID>/
class PostCommentView(APIView):
    def get_object(self, pk):
        try:
            return Posts.objects.get(pk=pk)
        except Posts.DoesNotExist:
            raise Http404
        
    def post(self, request, pk, format=None):
        postid = self.get_object(pk)
        serializer = CreateCommentsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user, post=postid)
            return Response({"message": "created Comment under {}: ".format(postid.title)})
        else:
            return Response({"Message": "COULD NOT create Comment"})

#Detail view for posts like: /forum/post/<POST_ID>/
#Can get, put, update and delete on this route
class PostDetailView(APIView):
    def get_object(self, pk):
        try:
            return Posts.objects.get(pk=pk)
        except Posts.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    # def delete(self, request, format=None):
    #     serializer = CreatePostsSerializer(data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response({"message":"created post"})
    #     else:
    #         return Respone({"message":"Could NOT create post"})

    # def update(self, request, format=None):
    #     categories = Category.objects.all()
    #     serializer = ViewCategorySerializer(categories, context={"request": request}, many=True)
    #     return Response(serializer.data)