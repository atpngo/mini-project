from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Item, Threshold, Powerline
from .serializers import ItemSerializer, ThresholdSerializer, PowerlineSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


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
    paginator = PageNumberPagination()
    # NUMBER OF LINES RETURNED
    paginator.page_size = 50
    items = Powerline.objects.all()
    result = paginator.paginate_queryset(items, request)
    serializer = PowerlineSerializer(result, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
def addPowerline(request):
    serializer = PowerlineSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)