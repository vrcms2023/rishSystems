from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.http import Http404
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser

# Create your views here.

class ImageGalleryView(viewsets.ModelViewSet):
    #permission_classes = (permissions.AllowAny,)
    parser_classes=[MultiPartParser, FormParser, FileUploadParser]

    def get_original_name(self,request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[0]
        return ""
    
    def get_content_type(self,request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[1]
        return ""

    def create(self, request, *args, **kwargs):
        try:

            path = request.data["path"]
            projectID = request.data["projectID"]
            category = request.data["category"]
            originalname = self.get_original_name(request)
            contentType = self.get_content_type(request)
            imageTitle = request.data["imageTitle"]
            imageDescription = request.data["imageDescription"]
            created_by = request.data["created_by"]
            updated_By = request.data["updated_By"]

            image = Gallery.objects.create(path=path,projectID=projectID, category=category, originalname=originalname, contentType=contentType, imageTitle=imageTitle, imageDescription=imageDescription,created_by=created_by, updated_By=updated_By)
            image.save()
            serializer = GallerySerializer(image)
        
            return Response({"imageModel" : serializer.data}, status=status.HTTP_201_CREATED)
        except Exception as e:
           return Response({'error' : str(e)},status=500)
        
    


    
class GetImagesView(viewsets.ModelViewSet):
    queryset= Gallery.objects.none()
    serializer_class = GallerySerializer
    http_method_names = ['get', ]

    def list(self, request):
        query_params = self.request.query_params
        id = query_params.get('projectID', None)
        ctgy = query_params.get('category', None)
        try:
            query_set = Gallery.objects.filter(projectID=id,category=ctgy)
            data = self.serializer_class(query_set, many=True).data
            return Response({"fileData":data},status=status.HTTP_200_OK)
        except Exception as e:
           return Response({'error' : str(e)},status=500)
    
    


class UpdateGalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

    http_method_names = ['patch', ]
    lookup_field = "path"

    def get_original_name(self,request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[0]
        return ""
    
    def get_content_type(self,request):

        image = request.data["path"]
        if not image == '':
            filename  = image.name
            return os.path.splitext(filename)[1]
        return ""

    def update(self, request, pk=None, *args, **kwargs):
       
            user = request.user
            id = request.data['id']
            instance = Gallery.objects.get(id=id)

            data = {
                "path" : request.data["path"],
                "category" : request.data["category"],
                "originalname" : self.get_original_name(request),
                "contentType" : self.get_content_type(request),
                "imageTitle" : request.data["imageTitle"],
                "imageDescription" : request.data["imageDescription"],
                "updated_By" : request.data["updated_By"]
                }
        
            serializer = self.serializer_class(instance=instance,
                                               data= data, # or request.data
                                               context={'author': user},
                                               partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteImageGalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    http_method_names = ['delete', ]

    def destroy(self, request, pk=None, *args, **kwargs):
        try:
            gallery = self.get_object()
            gallery.delete()
            return Response({"message":"Object deleted"}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)