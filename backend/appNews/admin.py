from django.contrib import admin
from  .models import *

# Register your models here.
@admin.register(AppNews)
class AddTestimonials(admin.ModelAdmin):
    list_display =("projectID", "newstitle")