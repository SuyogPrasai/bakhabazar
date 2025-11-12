from django.contrib import admin
from django.urls import path
from .views import csrf_ens

urlpatterns = [
    path('csrf/', csrf_ens, name='csrf_ens'),
]