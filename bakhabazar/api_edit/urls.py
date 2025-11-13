from django.urls import path
from .views import like_remove

urlpatterns = [
    path("like/", like_remove)
]
