from django.shortcuts import render, redirect
from forum.serializers import *
from forum.models import Category
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


"""

/posts/
/post/id/
/post/category/
/post/create/
/post/comment/<id>
/post/answer/<id>
/post/like/<id>

"""


# Get all posts in database. /forum/posts/
class PostsView(APIView):
    #get request
    def get(self, request, format=None):
        posts = Post.objects.all()
        serializer = ViewPostSerializer(posts, context={"request": request}, many=True)
        return Response(serializer.data)


#Detail view for posts like: /forum/post/<POST_ID>/
#Can get, put, update and delete on this route
class PostDetailView(APIView):
 
    def get(self, request, pk, format=None):
        post = get_object_or_404(Post, pk=pk)
        serializer = ViewPostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        post = Post.objects.get(pk=pk)
        serializer = ViewPostSerializer(post, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response({"Message": "Updated post"})

    def delete(self, request, pk, format=None):
        post = Post.objects.get(pk=pk)
        post.delete()
        return Response({"Message": "Deleted post"})

#adding a post under a category /forum/create-post/<CATEGORY_ID>
class PostCategoryView(APIView):

    #Get post by category id {Will change this to title}
    def get(self, request, pk, format=None):
        posts = Post.objects.get_posts_category(title)
        serializer = ViewPostSerializer(posts,  context={"request": request}, many=True)
        return Response(serializer.data)

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


class LikePostView(APIView):
    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def post(self, request, pk, format=None):
        post = self.get_object(pk)
        post.likes.add(request.user)
        serializer = ViewPostSerializer(post)
        return Response(serializer.data)


class CategoryPosts(APIView):
    def get(self, request, title,  format=None):
        posts = Post.objects.get_posts_category(title)
        serializer = ViewPostSerializer(posts, context={"request": request}, many=True)
        return Response(serializer.data)

class UserPosts(APIView):
    def get(self, request,format=None):
        posts = Post.objects.get_user_posts(request)
        serializer = ViewPostSerializer(posts, context={"request": request}, many=True)
        return Response(serializer.data)