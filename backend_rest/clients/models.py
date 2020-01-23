from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=100, unique=True)
    account = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.name
