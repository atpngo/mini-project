from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addItem),
    path('edit-threshold/', views.editThreshold),
    path('powerlines/', views.getPowerlines),
    path('add-powerline/', views.addPowerline),
]