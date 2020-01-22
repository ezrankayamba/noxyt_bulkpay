from . import models
from rest_framework import serializers


class TeamSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Team
        fields = ('id', 'name')


class OwnerSerializer(serializers.ModelSerializer):
    team = TeamSerializer()

    class Meta:
        model = models.Owner
        fields = ('id', 'name', "team")


class TaskSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer()

    class Meta:
        model = models.Project
        fields = ('id', 'name', "start_date", "duration", "owner")


class ProjectSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer()
    tasks = TaskSerializer(many=True)

    class Meta:
        model = models.Project
        fields = ('id', 'name', "start_date", "duration", "owner", "tasks")
