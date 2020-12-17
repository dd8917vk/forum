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

# Create your views here.
class CategoriesView(APIView):
    #get request
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = ViewCategorySerializer(categories, context={"request": request}, many=True)
        return Response(serializer.data)

# View Posts //get, post, update, delete

# Create your views here.
class PostsView(APIView):
    #get request
    def get(self, request, format=None):
        posts = Posts.objects.all()
        serializer = ViewPostSerializer(posts, context={"request": request}, many=True)
        return Response(serializer.data)

#adding a post under a category
class PostCategoryView(APIView):
     def post(self, request, pk, format=None):
         categoryid = Category.objects.get(pk=pk)
         serializer = CreatePostSerializer(data=request.data)
         if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user, category=categoryid)
            return Response({"message": "created Post"})
         else:
            return Response({"Message": "COULD NOT create POST"})

class PostCommentView(APIView):
    def post(self, request, pk, format=None):
        postid = Posts.objects.get(pk=pk)
        serializer = CreateCommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user, post=postid)
            return Response({"message": "created Comment under {}: ".format(postid.title)})
        else:
            return Response({"Message": "COULD NOT create Comment"})

#adding comments
class PostDetailView(APIView):
    def get_object(self, pk):
        try:
            return Posts.objects.get(pk=pk)
        except Posts.DoesNotExist:
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



 

    
    


