from django.http import JsonResponse
from itsdangerous import Serializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Item, Threshold, Powerline
from .serializers import ItemSerializer, ThresholdSerializer, PowerlineSerializer

@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET', 'PUT'])
def editThreshold(request):
    if request.method == 'GET':
        items = Threshold.objects.filter(id="1")
        serializer = ThresholdSerializer(items, many=True)
    elif request.method == 'PUT':
        items = Threshold.objects.get(id="1")
        serializer = ThresholdSerializer(items, data=request.data)
        if serializer.is_valid():
            serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def getPowerlines(request):
    items = Powerline.objects.all()
    serializer = PowerlineSerializer(items, many=True)
    return Response(serializer.data)