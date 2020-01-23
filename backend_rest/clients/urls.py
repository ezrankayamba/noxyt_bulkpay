from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.ClientListView.as_view()),
    path('create/', views.CreateClientView.as_view()),
]
