from rest_framework.response import Response
from hashids import Hashids
from asgiref.sync import sync_to_async 
import aiohttp
import asyncio
from io import BytesIO

hash = Hashids("121nsa", min_length=8)

def class_login_check(func):
    async def wrapper(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({"ctxt":"user is authenticated"}, status=400)
        return await func(self, request, *args, **kwargs)
    return wrapper



class Hasher:
    async def asave(self, *args, **kwargs):
        if self.uuid == None or self.uuid == "":
            await super().asave(*args, **kwargs)
            self.uuid = await sync_to_async(hash.encode)(self.pk)
        await super().asave(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        if self.uuid == None or self.uuid == "":
            super().save(*args, **kwargs)
            self.uuid = hash.encode(self.pk)
        super().save(*args, **kwargs)