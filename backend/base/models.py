from django.db import models

# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)


class Threshold(models.Model):
    value = models.FloatField()


class Powerline(models.Model):
    geometry = models.JSONField(null=True)
    wear = models.FloatField()
    weather = models.FloatField()
    vegetation = models.FloatField()
    name = models.TextField()
