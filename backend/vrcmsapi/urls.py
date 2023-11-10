from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/user/', include('user_auth.urls')),
    path('api/v1/project/', include('realestate.urls')),
    path('api/v1/gallery/', include('gallery.urls')),
    path('api/v1/testimonials/', include('testimonials.urls')),
    path('api/v1/appNews/', include('appNews.urls')),
    path('api/v1/contactus/', include('contactus.urls')),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name="index.html"))]
