from rest_framework import generics, permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from . import serializers
from . import models


class BatchListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['payments', 'clients']
    serializer_class = serializers.BatchSerializer

    def get_queryset(self):
        return models.Batch.objects.all()


class BatchDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = models.Batch
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['payments', 'clients']
    serializer_class = serializers.BatchSerializer

    def get_queryset(self):
        return models.Batch.objects.all()
