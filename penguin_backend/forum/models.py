from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length=50)
    date_posted = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['date_posted']

    def __str__(self):
        return f'Title: {self.title}'

class Posts(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(User, related_name='users')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f'Title: {self.title} Author: {self.author} Date Posted: {self.date_posted}'

class Comments(models.Model):
    body = models.CharField(max_length=200)
    date_posted = models.DateTimeField(default=timezone.now)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'Author: {self.author} Date Posted: {self.date_posted}'

class Answers(models.Model):
    body = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    votes = models.ManyToManyField(User, related_name='votes')
    answered = models.BooleanField(default=False)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)

    def __str__(self):
        return f'Author: {self.author} Date Posted: {self.date_posted}'


