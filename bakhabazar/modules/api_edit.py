from rest_framework import serializers
from asgiref.sync import sync_to_async
from rest_framework.response import Response
from api.models import Entity
from django.db import models
from api.models import Like

async def Generic_Serialization(serialize:serializers.Serializer ,request):
    ser = serialize(data=request.data)
    if await sync_to_async(ser.is_valid)():
        await ser.aupdate()
        return Response({"ctxt":"updated"}, status=200)
    return Response({"ctxt":"not validated"}, status=400)

class EditMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            if field not in ["uuid"]:
                self.fields[field].required = False
                
    async def aupdate(self, *args, **kwargs):
        try:
            self.inst = await self.Meta.model.objects.aget(uuid=self.initial_data.get("uuid"))
        except self.Meta.model.DoesNotExist:
            raise serializers.ValidationError("No Story Found")
        for key, value in self.validated_data.items():
            setattr(self.inst, key, value)
        await self.inst.asave()
        
    async def check_entity(self):
        if entities_uuid :=self.initial_data.get("entities",[]):
            for entity_uuid in entities_uuid:
                try:
                    entity = await Entity.objects.aget(uuid = entity_uuid)
                    await sync_to_async(entity.story.add)(self.inst)
                except Entity.DoesNotExist:
                    pass
                
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

def user_check(db_model:models.Model):
    def wrapper(func):
        async def decorator(request, *args, **kwargs):
            if request.method.lower() == "post":
                uuid = request.data.get("uuid")
            elif request.method.lower() == "get":
                uuid = request.query_params.get("uuid")
            if not uuid:
                return Response({"ctxt":"no uuid given"}, status=400)
            content = await db_model.objects.select_related("user" if db_model is Like else "author").aget(uuid=uuid)
            if (content.user if db_model is Like else content.author) == request.user:
                return await func(request, *args, **kwargs)
            else:
                return Response({"response":"user doesnt match"}, status=400)
        return decorator
    return wrapper