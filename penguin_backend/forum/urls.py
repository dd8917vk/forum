from django.urls import path
from django.conf.urls import url, include
from . import views
# from django.urls import path
# from django.conf.urls import url
# from .views import BeerViewSet # This library gives us all of the functions usually found in views.py
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'', BeerViewSet)
# urlpatterns = router.urls

urlpatterns = [
    #Command Routes
    #path('', views.test_view, name="test_view"),
    #path('categories/', views.CategoriesView.as_view(), name='category-view'),
    url(r'^categories/', views.CategoriesView.as_view(), name='category-view'),
    url(r'^posts/', views.PostsView.as_view(), name='posts-view'),
    url(r'^post/(?P<pk>[\w-]+)/$', views.PostDetailView.as_view(), name='post-detail'),
    url(r'^post-comment/(?P<pk>[\w-]+)/$', views.PostCommentView.as_view(), name='post-comment'),
    url(r'^post-answer/(?P<pk>[\w-]+)/$', views.PostAnswerView.as_view(), name='post-answer'),
    url(r'^create-post/(?P<pk>[\w-]+)/$', views.PostCategoryView.as_view(), name='category-post'),

]