from rest_framework import generics, permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from . import serializers
from . import models


class ClientListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['clients']
    serializer_class = serializers.ClientSerializer

    def get_queryset(self):
        return models.Client.objects.all()


class CreateClientView(generics.CreateAPIView):
    model = models.Client
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['clients']
    serializer_class = serializers.ClientSerializer
