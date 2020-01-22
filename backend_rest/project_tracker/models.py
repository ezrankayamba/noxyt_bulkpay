from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Owner(models.Model):
    name = models.CharField(max_length=100)
    team = models.ForeignKey(to=Team, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    duration = models.IntegerField()
    owner = models.ForeignKey(to=Owner, on_delete=models.CASCADE)
    project = models.ForeignKey(to='Project', related_name='tasks', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    duration = models.IntegerField()
    owner = models.ForeignKey(to=Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
