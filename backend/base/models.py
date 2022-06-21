from django.db import models

# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)


class Threshold(models.Model):
    value = models.FloatField()


# attempt a one to many database relation of geometry can't be stored as a string
# class Geometry(models.Model):
#     bbox = 


class Powerline(models.Model):
    geometry = models.JSONField(null=True)
    wear = models.FloatField()
    weather = models.FloatField()
    vegetation = models.FloatField()
    name = models.TextField()
