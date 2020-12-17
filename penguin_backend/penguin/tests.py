from django.test import TestCase
from rest_framework.test import APIClient, APITestCase
from .models import Commands, Favorites
from django.urls import reverse, include, path
from rest_framework.authtoken.models import Token
from rest_framework.test import force_authenticate
from django.test.client import encode_multipart, RequestFactory
from rest_framework.test import APIRequestFactory
from django.contrib.auth.models import User

# Create your tests here.

class APItest(APITestCase):
    def setUp(self):
        pass

    #Ensure API is up
    def test_api_endpoint(self):
        client = APIClient()
        response = client.get('/api/')
        self.assertEquals(response.status_code, 200)

    #Ensure commands list is up
    def test_command_endpoint(self):
        client = APIClient()
        response = client.get('/api/command_list/')
        self.assertEquals(response.status_code, 200)

    #Get a command by name
    def test_command_by_name(self):
        client = APIClient()
        response = client.get('/api/commandview/intro/')
        self.assertEquals(response.status_code, 200)

    #Get Favorites List, protected route
    def test_list_favorites(self):
        u = User(username='user', password='password123', email='test@test.com')
        u.save()
        user = User.objects.get(username='user')
        print(user)
        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get('/api/favorites_list/')
        self.assertEquals(response.status_code, 200)
    
    def test_create_user(self):
        u = User(username='user', password='password123', email='test@test.com')
        u.save()
        user = User.objects.get(username='user')
        user_count = User.objects.count()
        self.assertEquals(user_count, 1)

    # def test_l_favorites(self):
	#     # .. your other code... 
    #     token = Token.objects.get(user__username='user')
    #     client = APIClient()  
    #     # Attach the Authorization Token as part of the request.
    #     client.headers.update({'Authorization': f'Token {token.key}'})
    #     response = client.get('/api/favorites_list/')
    #     print(response)

    
        #Authenticate to DB
        #Make post request to auth?
        #After authenticated, make get request for favorites_list
        # token = Token.objects.get(user__username='user')
        # client = APIClient()
        # client.login(username="user", password="testuser")
        # client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        # # data = {'username': 'user', 'password': 'testuser'}

    
# from django.test import TestCase
# from django.urls import reverse, include, path
# from rest_framework import status
# from rest_framework.test import APITestCase, URLPatternsTestCase
# from django.contrib.auth.models import User
# from rest_framework_jwt.views import obtain_jwt_token
# from django.contrib import admin


# class AccountTests(APITestCase):
#     urlpatterns = [
#         path('admin/', admin.site.urls),
#         path('api/', include('penguin.urls')),
#         path('token-auth/', obtain_jwt_token),
#         path('penguin/', include('penguin.urls')),
#         path('forum/', include('forum.urls')),
#     ]

#     def test_create_account(self):
#         """
#         get a token
#         """
#         url = reverse('token-auth/')
        
#         # data = {'username': 'test', 'password': 'test'}
#         # response = self.client.post(url, data, format='json')
#         # print(response)
#         # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         # self.assertEqual(Account.objects.count(), 1)
#         # self.assertEqual(Account.objects.get().name, 'DabApps')
