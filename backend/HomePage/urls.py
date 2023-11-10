from django.urls import path
from .views import *


urlpatterns = [
    path('', ContactUSAPIView.as_view(), name="create_get_Conatactus")
]
