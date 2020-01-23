from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('oauth2/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('users/', include('users.urls')),
    path('clients/', include('clients.urls')),
    path('payments/', include('payments.urls')),
    # path('projects/', include('project_tracker.urls')),
]
