from django.urls import path, include
from . import views

urlpatterns = [
    path('batches/', views.BatchListView.as_view()),
    path('batches/<int:pk>', views.BatchDetailView.as_view()),
    path('batches/manual-create/', views.ManualEntryCreateBatchView.as_view()),
    # path('records/create/', views.PaymentCreateView.as_view()),
]
