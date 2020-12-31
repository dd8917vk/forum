import requests
import os
import json


#def read_routes():

"""
test file format

/forum/posts/1/ GET
/forum/posts/1/ PUT
/forum/posts/ GET
/forum/post/hacking/ POST {"title":"test", "body": "yay"}
/forum/post/hacking/ GET


"""


class EndpointTesting:

	#feed in agent information
	def __init__(self, url, username, password): 
		self.token = ""
		self.username = username
		self.password = password
		self.url = url
		self.count = 0
		self.passed = False
		self.routes = []

	#get token that is set for object
	def get_token(self): 
		if self.token == "":
			print("TOKEN NOT SET")
		else:
			print(self.token) 

	def read_routes(self):
		# read routes from file
		pass 
				
	#hit token route
	def get_auth(self):
		params = {}
		params["username"] = self.username
		params["password"] = self.password

		test = requests.post("{}/token-auth/".format(self.url), data=params)
		response = test.json()
		self.token = response["token"]
		
	#overidden function hitting endpoints
	def view_test(self, route, method): 		
		status = 0
		headers = {
			"Authorization": "jwt {}".format(self.token)
		}
		if method == "get":
			test = requests.get("{}/{}/".format(self.url, self.route), headers=headers)
			status = test.status_code
		elif method == "delete":
			test = requests.delete("{}/{}/".format(self.url, self.route), headers=headers)
			status = test.status_code
		else:
			print("GET OR DELETE not defined")

		if status == 200:
			print("PASSED! {}".format(route))
			self.count += 1
		else:
			print("FAILED! {}".format(status))

	# function for post route with parameters
	def view_test(self, route, method,  params):
		pass


myAgent = EndpointTesting("http://127.0.0.1:8000", "admin", "password")
myAgent.get_auth()
	
