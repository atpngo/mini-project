from rest_framework import serializers
from base.models import Item, Threshold, Powerline

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class ThresholdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Threshold
        fields = '__all__'


class PowerlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Powerline
        fields = '__all__'