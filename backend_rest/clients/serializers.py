from . import models
from rest_framework import serializers


class ClientSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Client
        fields = ('id', 'name', 'account', 'created_at', 'updated_at')
