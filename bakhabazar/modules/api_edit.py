from rest_framework import serializers
from asgiref.sync import sync_to_async
from rest_framework.response import Response
from api.models import Entity
from django.db import models
from api.models import Like
                
async def General_Remove(model:models.Model, request):
    try:
        uuid = request.query_params.get("uuid")
        if uuid:
            inst = await model.objects.aget(uuid = uuid)
        else:
            return Response({"ctxt":"uuid doesnot exist"},status=400)
    except model.DoesNotExist:
        return Response({"ctxt":"uuid doesnot exist"},status=400)
    await inst.adelete()
    return Response({"ctxt":"Deleted"},status=200)