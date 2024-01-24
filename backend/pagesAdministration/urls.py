from django.urls import path
from .views import *


urlpatterns = [
    path('createPageMenu/', CreatePages.as_view(), name="create_get_page_menu"),
    path('updatePageMenu/<pk>/', UpdatePageDetails.as_view(), name='retrieve_update_delete_page_menu')
]
