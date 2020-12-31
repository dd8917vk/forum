from django.shortcuts import render, redirect
from forum.serializers import *
from forum.models import Category
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


# Create your views here. /forum/categories/
class CategoriesView(APIView):
    #get request
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = ViewCategorySerializer(categories, context={"request": request}, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        serializer = CreateCategorySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"message": "created category"})
        else:
            return Response({"Message": "COULD NOT create category"})

    #post

    #put

    #delete