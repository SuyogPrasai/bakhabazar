from rest_framework.response import Response
from hashids import Hashids
from asgiref.sync import sync_to_async 
from openai import AsyncOpenAI
import aiohttp
import asyncio
from io import BytesIO
import os
import json
import tempfile

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
        
def chunks(func):
    async def wrapper(text:str, lang:str="en"):
        client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        li = text.split(".")
        print([i.strip() for i in li])
        li_func = [func((i.strip()+"."),lang) for i in li]
        print(len(li_func))
        files = await asyncio.gather(*li_func ,return_exceptions=True)
        file = BytesIO()
        for f in files:
            f.seek(0)
            file.write(f.read())
        
        file.seek(0)
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False)as tp:
                tp.write(file.getvalue())
                temp_path = tp.name
        with open(temp_path,'rb') as tp:
            transcription = await client.audio.transcriptions.create(
                file=tp,
                model="whisper-1",
                response_format="verbose_json",
                timestamp_granularities=["word"]
            )
            os.remove(temp_path)
        return file, [list(i) for i in transcription.words]
    return wrapper

@chunks
async def tts(text:str, lang:str="en") -> BytesIO:
    url = "https://translate.google.com/translate_tts"
    params = {
        "ie":"UTF",
        "q":text,
        "tl":lang,
        "client":"tw-ob"
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as res:
            fp = await res.read()
            file = BytesIO(fp)
            
    return file