from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class CommentManager(models.Manager):
    
    def get_latest_comments(self):
        comments = self.objects.all()
        return comments


class Comments(models.Model):
    body = models.CharField(max_length=200)
    date_posted = models.DateTimeField(default=timezone.now)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    objects = CommentManager()

    def __str__(self):
        return f'Author: {self.author} Date Posted: {self.date_posted}'