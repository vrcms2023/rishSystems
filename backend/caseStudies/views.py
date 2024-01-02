from django.shortcuts import get_object_or_404
from .models import CaseStudies
from .serializers import CaseStudiesSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

# Create your views here.
 
class CreateCaseStudies(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CaseStudies.objects.all()
    serializer_class = CaseStudiesSerializer

    """
    List all App news, or create a new App News.
    """

    def get(self, request, format=None):
        snippets = CaseStudies.objects.all()
        serializer = CaseStudiesSerializer(snippets, many=True)
        return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = CaseStudiesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"caseStudies": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateAndDeleteCaseStudiesDetail(APIView):
    """
    Retrieve, update or delete a App News instance.
    """
    def get_object(self, pk):
        try:
            return CaseStudies.objects.get(pk=pk)
        except CaseStudies.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CaseStudiesSerializer(snippet)
        return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CaseStudiesSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class ClientViewCaseStudies(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CaseStudies.objects.all()
    serializer_class = CaseStudiesSerializer

    """
    List all App news, or create a new App News.
    """

    def get(self, request, format=None):
        snippets = CaseStudies.objects.all()
        serializer = CaseStudiesSerializer(snippets, many=True)
        return Response({"caseStudies": serializer.data}, status=status.HTTP_200_OK)
    
