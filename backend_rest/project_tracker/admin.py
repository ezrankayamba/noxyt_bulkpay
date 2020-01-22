from django.contrib import admin
from . import models

admin.site.register(models.Project)
admin.site.register(models.Team)
admin.site.register(models.Owner)
admin.site.register(models.Task)
