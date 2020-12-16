from django.contrib import admin
from .models import Posts, Category, Comments, Answers
# Register your models here.
admin.site.register(Posts)
admin.site.register(Category)
admin.site.register(Comments)
admin.site.register(Answers)