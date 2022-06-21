from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getData),
    path('add/', views.addItem),
    path('edit-threshold/', views.editThreshold),
    path('powerlines/', views.getPowerlines),
    path('add-powerline/', views.addPowerline),

    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.addUser),
]