from django.urls import path
from . import views
from .views import current_user, UserList
# from django.urls import path
# from django.conf.urls import url
# from .views import BeerViewSet # This library gives us all of the functions usually found in views.py
# from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'', BeerViewSet)
# urlpatterns = router.urls

urlpatterns = [
    #Command Routes
    path('', views.command_overview, name="command_overview"),
    path('command_list/', views.command_list, name="command_list"),
    path('commandview/<str:command>/', views.command_view_by_name, name="command_view_by_name"),
    #Post Routes
    path('favorites_list/', views.favorites_list, name="favorites_list"),
    path('favorites_create/', views.favorites_create, name="favorites_create"),
    path('favorites_update/<int:pk>/', views.favorites_update, name="favorites_update"),
    path('favorites_delete/<int:pk>/', views.favorites_delete, name="favorites_delete"),
    #Auth routes
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    #path('beercreate/', views.beer_create, name="beer_create"),
    #path('beerupdate/<int:pk>', views.beer_update, name="beer_update"),
    #path('beerdelete/<int:pk>', views.beer_delete, name="beer_delete"),
    ]