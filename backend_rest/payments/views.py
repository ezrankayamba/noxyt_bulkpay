from rest_framework import generics, permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from . import serializers
from . import models


class BatchListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['payments', 'clients']
    serializer_class = serializers.BatchSerializer

    def get_queryset(self):
        return models.Batch.objects.all()


class BatchCreateView(generics.CreateAPIView):
    model = models.Batch
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['payments', 'clients']
    serializer_class = serializers.BatchSerializer


class PaymentListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['payments', 'clients']
    serializer_class = serializers.PaymentSerializer

    def get_queryset(self):
        return models.Payment.objects.all()


class PaymentCreateView(generics.CreateAPIView):
    model = models.Payment
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['payments', 'clients']
    serializer_class = serializers.PaymentSerializer
