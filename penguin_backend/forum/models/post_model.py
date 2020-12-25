from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from .category_model import *
from django.shortcuts import get_object_or_404
# Create your models here.

class PostManager(models.Manager):

    #get most recent posts
    def get_latest_posts(self):
        posts = self.objects.all()
        return posts

    #get a users posts
    def get_user_posts(self, request):
        posts = self.filter(author=request.user)
        return posts

    #get posts under a specific category
    def get_posts_category(self, title):
        set_category = get_object_or_404(Category, title=title)
        posts = self.filter(category=set_category)
        return posts

    def favorite_post(self, pk, request):
        myuser = request.user
        post = self.get(pk=pk)
        post.favorites.add(myuser)
        return "Favorited {}".format(post.title)


class Post(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(User, related_name='users')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    objects = PostManager()

    def __str__(self):
        return f'Title: {self.title} Author: {self.author} Date Posted: {self.date_posted}'
