from django.db import models
import uuid
import os
from django.utils import timezone

# Create your models here.

class AppNews(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    projectID =     models.CharField(max_length=100, null=False)
    imageUrls =      models.JSONField(null=True)
    imageIds =       models.JSONField(null=True)
    originalnames=   models.JSONField(null=True)
    newstitle =     models.CharField(max_length=500, null=True)
    description =   models.CharField(max_length=5000, null=True)
    created_by =    models.CharField(max_length=50, null=False)
    updated_By =    models.CharField(max_length=50, null=False)
    created_at =    models.DateTimeField(auto_now_add=True)
    updated_at =    models.DateTimeField(auto_now=True)
  
