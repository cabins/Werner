from django.db import models


class ErrorRecord(models.Model):
    id = models.AutoField(primary_key=True)
    api = models.CharField(max_length=500, null=False)
    default_value = models.TextField(max_length=5000, default=None, null=True, blank=True)
    current_value = models.TextField(max_length=5000, default=None, null=True, blank=True)
    code = models.IntegerField(default=200)
    https = models.IntegerField(default=0)
    encrypt = models.IntegerField(default=1)

    def __str__(self):
        return self.api

    class Meta:
        ordering = ['id', 'api', 'code']
