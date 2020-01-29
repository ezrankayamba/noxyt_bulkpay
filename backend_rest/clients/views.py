from rest_framework import generics, permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from . import serializers
from . import models
from rest_framework.views import APIView
import json
from rest_framework.response import Response


class ClientListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['clients']
    serializer_class = serializers.ClientSerializer

    def get_queryset(self):
        return models.Client.objects.all()


class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = models.Client
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['clients']
    serializer_class = serializers.ClientSerializer

    def get_queryset(self):
        return models.Client.objects.all()


class DeleteClientsView(APIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['clients']

    def post(self, request, format=None):
        ids = request.data
        models.Client.objects.filter(pk__in=ids).delete()
        return Response({
            'status': 0,
            'message': f'Successfully deleted {len(ids)} records'
        })
