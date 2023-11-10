from django.shortcuts import render
from rest_framework import generics, permissions

# Create your views here.

class CreateHomePage(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
