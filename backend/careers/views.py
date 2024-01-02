from .models import Careers
from .serializers import CareerSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from django.db.models import Q

# Create your views here.

class CreateCareer(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Careers.objects.all()
    serializer_class = CareerSerializer

    """
    List all Careers, or create a new Careers.
    """

    def get(self, request, format=None):
        snippets = Careers.objects.all()
        serializer = CareerSerializer(snippets, many=True)
        return Response({"careers": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = CareerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"careers": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateCareersDetail(APIView):
    """
    Retrieve, update or delete a Careers instance.
    """
    def get_object(self, pk):
        try:
            return Careers.objects.get(pk=pk)
        except Careers.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CareerSerializer(snippet)
        return Response({"careers": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CareerSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"careers": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

""" 
publish Careers View
"""
class PublishCareerAPIView(generics.RetrieveUpdateAPIView):

    def patch(self, request, pk, format=None):
        snippet = Careers.objects.get(pk=pk)
        serializer = CareerSerializer(snippet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"careers" : serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

""" 
Client Service View
"""
class ClientCareerAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CareerSerializer
  
    def get_object(self):
        try:
            return Careers.objects.filter(publish= True)
        except Careers.DoesNotExist:
            return Response( status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
      
        snippets = self.get_object()
        serviceList = CareerSerializer(snippets, many=True)
        return Response({"careers" : serviceList.data}, status=status.HTTP_200_OK)
    

class ClientSelectedCareerAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CareerSerializer
  
    def get_object(self, pk):
        try:
            return Careers.objects.get(pk=pk)
        except Careers.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CareerSerializer(snippet)
        return Response({"careers": serializer.data}, status=status.HTTP_200_OK)
    

class CareerSearchAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CareerSerializer
  
    def get_object(self, query):
        try:
            return Careers.objects.filter(
                Q(job_title__icontains=query) | Q(job_location__icontains=query) | Q(company_name__icontains=query)
            )
        except Careers.DoesNotExist:
            raise Http404

    def get(self, request, query, format=None):
        snippet = self.get_object(query)
        serializer = CareerSerializer(snippet, many=True)
        return Response({"careers": serializer.data}, status=status.HTTP_200_OK)