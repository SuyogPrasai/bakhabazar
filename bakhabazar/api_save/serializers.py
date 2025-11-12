from rest_framework import serializers
from adrf.serializers import ModelSerializer
from api.models import Entity, Story, Legend, Comment, Like
from asgiref.sync import sync_to_async
from modules.api_save import ExpressionMixin
import json

class Entity_Serializer(ModelSerializer):
    class Meta:
        model = Entity
        exclude = ['uuid', 'story', 'legend']
        read_only_fields = ["author"]
        
    async def acreate(self, validated_data):
        user = self.context.get('user')
        entity= Entity(author=user, **validated_data)
        await entity.asave()
        return entity
        
    
    async def asave(self, **kwargs):
        return await self.acreate(self.validated_data)
        
class Story_Serializer(ModelSerializer):
    class Meta:
        model = Story
        exclude = ['uuid']
        read_only_fields = ["author"]
        
    async def acreate(self, validated_data):
        user = self.context.get('user')
        raw_entities_uuid = self.initial_data.get("entities",[])
        entities_uuid = raw_entities_uuid if type(raw_entities_uuid) is list else json.loads(raw_entities_uuid)
        story = Story(author=user, **validated_data)
        await story.asave()
        if entities_uuid:
            for entity_uuid in entities_uuid:
                try:
                    entity = await Entity.objects.aget(uuid = entity_uuid)
                    await sync_to_async(entity.story.add)(story)
                except Entity.DoesNotExist:
                    pass
        return story
    
    async def asave(self, **kwargs):
        return await self.acreate(self.validated_data)

class Legend_Serializer(ModelSerializer):
    class Meta:
        model = Legend
        exclude = ['uuid']
        read_only_fields = ["author"]
        
    async def acreate(self, validated_data):
        user = self.context.get('user')
        raw_entities_uuid = self.initial_data.get("entities",[])
        entities_uuid = raw_entities_uuid if type(raw_entities_uuid) is list else json.loads(raw_entities_uuid)
        legend = Legend(author=user, **validated_data)
        await legend.asave()
        if entities_uuid:
            for entity_uuid in entities_uuid:
                entity = await Entity.objects.aget(uuid = entity_uuid)
                await sync_to_async(entity.legend.add)(legend)
        return legend
    
    async def asave(self, **kwargs):
        return await self.acreate(self.validated_data)
    
class Comment_Serializer(ExpressionMixin):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["author"]
        
class Like_Serializer(ExpressionMixin):
    class Meta:
        model = Like
        fields = "__all__"
        read_only_fields = ["author"]
    
