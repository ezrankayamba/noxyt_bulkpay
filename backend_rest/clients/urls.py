from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.ClientListView.as_view()),
    path('<int:pk>', views.ClientDetailView.as_view()),
]
