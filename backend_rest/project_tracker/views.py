from rest_framework import generics, permissions
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from . import serializers
from . import models


class ProjectList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]
    required_scopes = ['projects']
    serializer_class = serializers.ProjectSerializer

    def get_queryset(self):
        return models.Project.objects.all()
