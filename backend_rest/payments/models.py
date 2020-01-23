from django.db import models


class Batch(models.Model):
    name = models.CharField(max_length=100)
    comments = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.name


class Payment(models.Model):
    account = models.CharField(max_length=20)
    reason = models.CharField(max_length=100)
    amount = models.DecimalField(decimal_places=2, max_digits=20)
    batch = models.ForeignKey(to=Batch, on_delete=models.PROTECT, related_name="records")

    def __str__(self):
        return self.account
