from django.db import models
import uuid
import os
from django.utils import timezone

# Create your models here.

def upload_path(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"images/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"




class Gallery(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    projectID =     models.CharField(max_length=100, null=False)
    path =          models.FileField(blank=True, null=True, upload_to=upload_path )
    category =      models.CharField(max_length=100, null=True)
    originalname=   models.CharField(max_length=100, null=True, blank=True)
    contentType=    models.CharField(max_length=100, null=True, blank=True)
    imageTitle =    models.CharField(max_length=500, null=True)
    imageDescription = models.CharField(max_length=5000, null=True)
    created_by =    models.CharField(max_length=50, null=True, blank=True)
    updated_By =    models.CharField(max_length=50, null=True, blank=True)
    created_at =    models.DateTimeField(auto_now_add=True)
    updated_at =    models.DateTimeField(auto_now=True)


