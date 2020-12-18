from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from .category_model import *
# Create your models here.

class PostManager(models.Manager):

    def get_latest_posts(self):
        posts = self.objects.all()
        return posts


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