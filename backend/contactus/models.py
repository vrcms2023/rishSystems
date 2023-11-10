from django.db import models
import uuid

# Create your models here.

class ContactUS(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    firstName =          models.CharField(max_length=100, null=False)
    email =         models.EmailField(max_length=254, null=False)
    phoneNumber=    models.CharField(max_length=50, null=False)
    description =   models.CharField(max_length=5000, null=False)
    created_at =    models.DateTimeField(auto_now_add=True)

  