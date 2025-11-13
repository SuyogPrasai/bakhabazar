from django.urls import path, include
from .views import csrf_ens, story, legend, entity, comment, Register, Login, api_logout, ai

urlpatterns = [
    path('csrf/', csrf_ens, name='csrf_ens'),
    path('legend/', legend, name="legend"),
    path("story/", story, name="story"),
    path("entity/", entity, name="entity"),
    path("comment/", comment, name= "comment"),
    path("register/", Register.as_view(), name="register"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", api_logout, name="logout"),
    path('ai/', ai, name='ai')
]
