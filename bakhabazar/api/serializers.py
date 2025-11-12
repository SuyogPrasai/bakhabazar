from rest_framework import serializers
from adrf.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Avatar
from asgiref.sync import sync_to_async

class Register_Serializer(ModelSerializer):
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    username = serializers.CharField()
    avatar = serializers.ImageField(required=False, allow_null=True)
    dob = serializers.DateField()
    
    class Meta:
        model = Avatar
        fields = ["firstname", "lastname", "password", "username", "avatar", "email", "dob"]
        
    async def acreate(self, validated_data):
        valid = {
            'username':validated_data.pop("username"),
            "first_name":validated_data.pop("firstname"),
            "last_name":validated_data.pop("lastname"),
            "email":validated_data.pop("email"),
            "password":validated_data.pop("password")
        }
        user = await sync_to_async(User.objects.create_user)(**valid)
        if user.is_active:
            avatar = Avatar(user=user,**validated_data)
            await avatar.asave()
            return avatar
        raise serializers.ValidationError("Invalid credentials")
    
    async def asave(self, **kwargs):
        return await self.acreate(self.validated_data)