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
    url(r'^categories/', views.CategoriesView.as_view(), name='category-view'),
    url(r'^post/$', views.PostsView.as_view(), name='post-view'),
    url(r'^post/(?P<pk>[\w-]+)/$', views.PostDetailView.as_view(), name='post-detail'),
    url(r'^post-comment/(?P<pk>[\w-]+)/$', views.PostCommentView.as_view(), name='post-comment'),
    url(r'^create-post/(?P<pk>[\w-]+)/$', views.PostCategoryView.as_view(), name='category-post'),

]