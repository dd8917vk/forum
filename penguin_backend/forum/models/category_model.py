from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class CategoryManager(models.Manager):

    def get_latest_categories(self):
        categories = self.objects.all()
        return categories

class Category(models.Model):
    title = models.CharField(max_length=50)
    date_posted = models.DateTimeField(default=timezone.now)
    objects = CategoryManager()
    
    class Meta:
        ordering = ['date_posted']

    def __str__(self):
        return f'Title: {self.title}'
