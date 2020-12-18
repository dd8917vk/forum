from django.shortcuts import render, redirect
from django.http import HttpResponse
from .serializers import *
from .models import Category
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import filters
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.authtoken.models import Token
from django.http import Http404

"""
/categories/
/posts/ # gets all the posts
/posts/categoryid/
/posts/id/ Get, update, delete, POST -> 
/post-comments/<postid>


git add. 
git commit -m 'first commit' 
git push forum shay

"""

# Create your views here. /forum/categories/
class CategoriesView(APIView):
    #get request
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = ViewCategorySerializer(categories, context={"request": request}, many=True)
        return Response(serializer.data)

# View Posts //get, post, update, delete

# Get all posts in database. /forum/posts/
class PostsView(APIView):
    #get request
    def get(self, request, format=None):
        posts = Post.objects.all()
        serializer = ViewPostSerializer(posts, context={"request": request}, many=True)
        return Response(serializer.data)

#adding a post under a category /forum/create-post/<CATEGORY_ID>
class PostCategoryView(APIView):
     def post(self, request, pk, format=None):
         categoryid = Category.objects.get(pk=pk)
         serializer = CreatePostSerializer(data=request.data)
         if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user, category=categoryid)
            return Response({"message": "created Post"})
         else:
            return Response({"Message": "COULD NOT create POST"})


#This creates a comment under a post like so /forum/post-comment/<POST ID>/
class PostCommentView(APIView):

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404
    #view comments under posts
    def get(self, request, pk, format=None):
        postid = self.get_object(pk)
        comments = Comment.objects.filter(post=postid)
        serializer = ViewCommentSerializer(comments, context={"request": request}, many=True )
        return Response(serializer.data)

    #upload comment
    def post(self, request, pk, format=None):
        postid = self.get_object(pk)
        serializer = CreateCommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user, post=postid)
            return Response({"message": "created Comment under {}: ".format(postid.title)})
        else:
            return Response({"Message": "COULD NOT create Comment"})

#This creates a comment under a post like so /forum/post-comment/<POST ID>/
class PostAnswerView(APIView):

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404
    #view comments under posts
    def get(self, request, pk, format=None):
        postid = self.get_object(pk)
        answers = Answer.objects.filter(post=postid)
        serializer = ViewAnswerSerializer(answers, context={"request": request}, many=True )
        return Response(serializer.data)

    #upload comment
    def post(self, request, pk, format=None):
        postid = self.get_object(pk)
        serializer = CreateAnswerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user, post=postid)
            return Response({"message": "created Answer under {}: ".format(postid.title)})
        else:
            return Response({"Message": "COULD NOT create Comment"})


#Detail view for posts like: /forum/post/<POST_ID>/
#Can get, put, update and delete on this route
class PostDetailView(APIView):
    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = ViewPostSerializer(post)
        return Response(serializer.data)


    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = ViewPostSerializer(post, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

