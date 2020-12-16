from django.urls import path
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
    path('', views.test_view, name="test_view"),
]