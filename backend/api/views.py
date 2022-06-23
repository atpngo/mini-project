from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Item, Threshold, Powerline
from .serializers import ItemSerializer, ThresholdSerializer, PowerlineSerializer, RegisterSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import status
from django.http import QueryDict

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username

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
    if Powerline.objects.all().filter(name=request.data.get("name")).exists():
        return Response({"Fail":"Powerline already exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    serializer = PowerlineSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def deletePowerline(request):
    if Powerline.objects.all().filter(name=request.data.get("name")).exists():
        Powerline.objects.all().filter(name=request.data.get("name")).delete()
        return Response({"Success":"Powerline successfully deleted"}, status=status.HTTP_200_OK)
    else:
        return Response({"Fail":"Powerline does not exist with that name"}, status=status.HTTP_406_NOT_ACCEPTABLE)

@api_view(['PUT'])
def updatePowerline(request):
    # print(request.data)
    items = Powerline.objects.get(name=request.data.get("name"))
    tmp = request.data.dict()
    tmp['name'] = tmp['newName']
    newRequest = QueryDict('', mutable=True)
    newRequest.update(tmp)
    serializer = PowerlineSerializer(items, data=newRequest)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
        

@api_view(['POST'])
def addUser(request):
    if User.objects.all().filter(username=request.data.get("username")).exists():
        return Response({"Fail":"Username already exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
