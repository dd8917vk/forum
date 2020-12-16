from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.
class Commands(models.Model):
    command = models.CharField(max_length=255)
    description = models.TextField()
    link = models.CharField(max_length=255)
    html = models.TextField()
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.command

# class Post(models.Model):
#     title = models.CharField(max_length=100)
#     content = models.TextField()
#     date_posted = models.DateTimeField(default=timezone.now)
#     #author = models.ForeignKey(User, on_delete=models.CASCADE)

#     def __str__(self):
#         return f'Title: {self.title} Author: {self.author} Date Posted: {self.date_posted}'

class Favorites(models.Model):
    command = models.CharField(unique=True, max_length=255)
    description = models.TextField()
    comment = models.TextField()
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'Command: {self.command} Author: {self.author}'

