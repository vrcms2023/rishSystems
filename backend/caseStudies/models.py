from django.db import models
import uuid
from django.utils import timezone
from common.BaseModel import ImageModel
# Create your models here.

class CaseStudies(ImageModel):
    case_studies_title =            models.CharField(max_length=500, null=True, blank=True)
    case_studies_description =      models.JSONField(null=True, blank=True)
