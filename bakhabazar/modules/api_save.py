from asgiref.sync import sync_to_async
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from api.models import Story, Legend, Comment, Like
from rest_framework import serializers

async def Generic_Save(serializer, request):
    ser = serializer(data=request.data, context = {"user":request.user})
    if await sync_to_async(ser.is_valid)():
        await ser.asave()
        return Response({"ctxt":"created"}, status=HTTP_201_CREATED)
    else:
        return Response({"errors":ser.errors}, status=HTTP_400_BAD_REQUEST)
    
class ExpressionMixin(serializers.Serializer):
    async def acreate(self, validated_data):
        model = self.Meta.model
        if (content_type := self.initial_data.get("content_type",None)) not in ["story", "legend","comment"]:
            raise "content_type not provided"
        user = self.context.get('user')
        uuid = self.initial_data.get("uuid", None)
        if content_type == "story":
            content = await Story.objects.aget(uuid = uuid)
        elif content_type == "legend":
            content = await Legend.objects.aget(uuid = uuid)
        elif content_type == "comment" and model == Like:
            content = await Comment.objects.aget(uuid = uuid)
            
        expression = model(**{"author" if model == Comment else "user":user}, **{content_type:content}, **validated_data)
        await expression.asave()
        return expression
    
    async def asave(self, **kwargs):
        return await self.acreate(self.validated_data)