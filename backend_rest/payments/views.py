from rest_framework import generics, permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from . import serializers
from . import models
from rest_framework.views import APIView
from rest_framework.response import Response


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


class ManualEntryCreateBatchView(APIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['payments', 'clients']

    def post(self, request, format=None):
        data = request.data
        batch = models.Batch.objects.create(name=data['name'], comments=data['comments'])
        records = data['records']
        for r in records:
            models.Payment.objects.create(account=r['account'], amount=r['amount'], reason=r['reason'], batch=batch)

        return Response({
            'status': 0,
            'message': f'Successfully created {len(records)} records',
            'batchId': 123
        })
