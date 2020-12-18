from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class AnswerManager(models.Manager):
    
    def get_latest_answers(self):
        answers = self.objects.all()
        return answers


class Answers(models.Model):
    body = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    votes = models.ManyToManyField(User, related_name='votes')
    answered = models.BooleanField(default=False)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    objects = AnswerManager()

    def __str__(self):
        return f'Author: {self.author} Date Posted: {self.date_posted}'