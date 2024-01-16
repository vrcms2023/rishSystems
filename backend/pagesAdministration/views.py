from .models import PageDetails
from .serializers import PagesAdministrationSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

# Create your views here.

class CreatePages(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = PageDetails.objects.all()
    serializer_class = PagesAdministrationSerializer

    """
    Get Page Details, or create a new Page Details.
    """

    def get(self, request, format=None):
        snippets = PageDetails.objects.all()
        serializer = PagesAdministrationSerializer(snippets, many=True)
        return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = PagesAdministrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"PageDetails": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePageDetails(APIView):
    """
    Retrieve, update or delete a PageDetails instance.
    """
    def get_object(self, pk):
        try:
            return PageDetails.objects.get(pk=pk)
        except PageDetails.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = PagesAdministrationSerializer(snippet)
        return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = PagesAdministrationSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




""" 
Client Service View
"""
    
class ClientPageDetailsAPIView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = PageDetails.objects.all()
    serializer_class = PagesAdministrationSerializer

    """
    List all PageDetails, or create a new PageDetails.
    """

    def get_object(self):
        try:
            return PageDetails.objects.get(page_isActive=True)
        except PageDetails.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        snippets = self.get_object()
        serializer = PagesAdministrationSerializer(snippets, many=True)
        return Response({"PageDetails": serializer.data}, status=status.HTTP_200_OK)
    
