from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.core.files.base import ContentFile
from adrf.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from adrf.views import APIView
from .models import Story, Legend, Entity, Comment, Avatar
from .serializers import Register_Serializer
from django.contrib.auth import authenticate, login, logout
from asgiref.sync import sync_to_async
import random
import json
import httpx
import os
import base64
from io import BytesIO
from openai import AsyncClient
from dotenv import load_dotenv
from modules.api import class_login_check
load_dotenv()
#MultiPartParsers handles files and images
#FormParser handles normal forms with text
MODEL = AsyncClient(api_key=os.getenv("OPENAI_API_KEY"))

@ensure_csrf_cookie
def csrf_ens(request):
    return JsonResponse({"detail":"Provided"})

@api_view(['GET'])
async def story(request):
    length = int(request.query_params.get("number") if request.query_params.get("number") else 10)
    res= []
    if request.query_params.get("uuid") == None:
        try:
            if request.query_params.get("title") != None:
                stories = [a async for a in Story.objects.select_related("author").filter(title__icontains = request.query_params.get("title"))[:length] ]
            else:
                stories = random.sample([i async for i in Story.objects.select_related("author").all()], k = length)
        except ValueError:
            stories = [i async for i in Story.objects.select_related("author").all()[:length]]
        for i in stories:
            res.append({
                "title": i.title,
                "synopsis": " ".join(i.content.split(" ")[:30]),
                "entity": [{
                    "name":e.name,
                    "synopsis": " ".join(e.content.split(" ")[:30]),
                    "pic":e.picture.url if e.picture else None,
                    "uuid":e.uuid
                    } async for e in i.entities.all()
                ],
                "author": i.author.username,
                "picture": i.picture.url if i.picture else None,
                "likes": await i.likes.all().acount(),
                "user_like": await i.likes.filter(user=request.user.id).aexists(),
                "uuid": i.uuid
            })
        return Response(res)
    else:
        try:
            storey = await Story.objects.select_related("author").aget(uuid=request.query_params.get("uuid"))
            res = {
                    "title": storey.title,
                    "content": storey.content,
                    "synopsis": " ".join(storey.content.split(" ")[:30]),
                    "entity":[{
                        "name":i.name,
                        "pic":i.picture.url if i.picture else None,
                        "synopsis": " ".join(i.content.split(" ")[:30]),
                        "uuid":i.uuid
                    } async for i in storey.entities.all()], 
                    "likes": await storey.likes.all().acount(),
                    "user_like": await storey.likes.filter(user=request.user.id).aexists(),
                    "author": storey.author.username,
                    "picture": storey.picture.url if storey.picture else None,
                    "audio": storey.audio.url,
                    "srt":storey.srt,
                    "uuid": storey.uuid
            }
            return Response(res)
        except Story.DoesNotExist:
            return Response(status=404)
    
@api_view(['GET'])
async def legend(request):
    length = int(request.query_params.get("number") if request.query_params.get("number") else 10)
    res= []
    if request.query_params.get("uuid") == None:
        try:
            if request.query_params.get("title") != None:
                legends = [i async for i in Legend.objects.select_related("author").filter(title__icontains = request.query_params.get("title"))[:length]]
            else:
                legends = random.sample([i async for i in Legend.objects.select_related("author").all()], k = length)
        except ValueError:
            legends = [i async for i in Legend.objects.select_related("author").all()[:length]]
        for i in legends:
            res.append({
                "title": i.title,
                "synopsis": " ".join(i.content.split(" ")[:30]),
                "likes": await i.likes.all().acount(),
                "user_like": await i.likes.filter(user=request.user.id).aexists(),
                "entity": [{
                    "name":e.name,
                    "synopsis": " ".join(e.content.split(" ")[:30]),
                    "pic":e.picture.url if e.picture else None,
                    "uuid":e.uuid
                    } async for e in i.entities.all()
                ],
                "author": i.author.username,
                "picture": i.picture.url if i.picture else None,
                "uuid": i.uuid
            })
        return Response(res)
    else:
        try:
            legen = await Legend.objects.select_related("author").aget(uuid=request.query_params.get("uuid"))
            res = {
                    "title": legen.title,
                    "content": legen.content,
                    "likes": await legen.likes.all().acount(),
                    "user_like": await legen.likes.filter(user=request.user.id).aexists(),
                    "synopsis": " ".join(legen.content.split(" ")[:30]),
                    "author": legen.author.username,
                    "entity":[{
                        "name":i.name,
                        "pic":i.picture.url if i.picture else None ,
                        "synopsis": " ".join(i.content.split(" ")[:30]),
                        "uuid":i.uuid
                    } async for i in legen.entities.all()],
                    "picture": legen.picture.url if legen.picture else None,
                    "audio": legen.audio.url,
                    "srt":legen.srt,
                    "uuid": legen.uuid
            }
            return Response(res)
        except Legend.DoesNotExist:
            return Response(status=404)

@api_view(['GET'])
async def entity(request):
    length = int(request.query_params.get("number") if request.query_params.get("number") else 10)
    res= []
    if request.query_params.get("uuid") == None:
        try:
            if request.query_params.get("name") != None:
                entities = [i async for i in Entity.objects.select_related("author").filter(name__icontains = request.query_params.get("name"))[:length]]
            else:
                entities = random.sample([i async for i in Entity.objects.select_related("author").all()], k = length)
        except ValueError:
            entities = [i async for i in Entity.objects.select_related("author").all()[:length]]
        for i in entities:
            res.append({
                "name": i.name,
                "alt_name":i.alternate_names,
                "synopsis": " ".join(i.content.split(" ")[:30]),
                "picture": i.picture.url if i.picture else None,
                "author": i.author.username,
                "uuid": i.uuid,
                "stories": [{
                    "title":s.title,
                    "synposis":" ".join(s.content.split(" ")[:30]),
                    "pic": s.picture.url if s.picture else None ,
                    "uuid": s.uuid
                } async for s in i.story.all()[:5]],
                "legends": [{
                    "title":l.title,
                    "synposis":" ".join(l.content.split(" ")[:30]),
                    "pic": l.picture.url if l.picture else None,
                    "uuid":l.uuid 
                } async for l in i.legend.all()[:5]]
            })
        return Response(res)
    else:
        try:
            enti = await Entity.objects.select_related("author").aget(uuid=request.query_params.get("uuid"))
            res = {
                    "name": enti.name,
                    "content": enti.content,
                    "alt_name":enti.alternate_names,
                    "author": enti.author.username,
                    "synopsis": " ".join(enti.content.split(" ")[:30]),
                    "picture": enti.picture.url if enti.picture else None,
                    "stories": [{
                        "title":i.title,
                        "synposis":" ".join(i.content.split(" ")[:30]),
                        "pic": i.picture.url if i.picture else None ,
                        "uuid": i.uuid
                    } async for i in enti.story.all()[:5]],
                    "legends": [{
                        "title":i.title,
                        "synposis":" ".join(i.content.split(" ")[:30]),
                        "pic": i.picture.url if i.picture else None,
                        "uuid":i.uuid 
                    } async for i in enti.legend.all()[:5]],
                    "uuid": enti.uuid
            }
            return Response(res)
        except Entity.DoesNotExist:
            return Response(status=404)
        
@api_view(["GET"])
@permission_classes([IsAuthenticated])
async def like(request):
    if (uuid:=request.query_params.get("uuid")) and (content_type := request.query_params.get("content_type")):
        try: 
            await request.user.likes.aget(**{f"{content_type}__uuid":uuid})
            return Response(status=200)
        except:
            return Response(status=400)

@api_view(["GET"])
async def comment(request):
    if (uuid := request.query_params.get("uuid")) and (content_type := request.query_params.get("content_type")):
        try:
            res = [
                {
                    "comment":i.comment,
                    "author":i.author.username,
                    "likes": await i.likes.all().acount(), 
                    "uuid":i.uuid
                } async for i in Comment.objects.select_related("author").filter(**{f"{content_type}__uuid":uuid})[:int(request.query_params.get("length")) if request.query_params.get("length") else 30]
            ]
            return Response(res)
        except TypeError:
            return Response(status=404)
    else:
        return Response(status=404)


class Register(APIView):
    async def get(self, request):
        if email:=request.query_params.get("email"):
            exists = await sync_to_async(Avatar.objects.filter(user__email = email).exists)()
            if not exists:
                return Response({"ctxt":"email does not exist"}, status=200)
            return Response({"ctxt":"email exists"}, status=400)
        
        if username:=request.query_params.get("username"):
            exists = await sync_to_async(Avatar.objects.filter(user__username = username).exists)()
            if not exists:
                return Response({"ctxt":"username does not exist"}, status=200)
            return Response({"ctxt":"username exists"}, status=400)
        
        return Response({"ctxt":"bad request"}, status=401)
    
    @class_login_check
    async def post(self, request):
        print(request.data)
        serializer = Register_Serializer(data = request.data)
        if await sync_to_async(serializer.is_valid)():
            await serializer.asave()
            return Response({"detail": "User registered"}, status=201)
        return Response(serializer.errors, status=400)
    
class Login(APIView):

    
    async def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            avatar = await Avatar.objects.aget(user=user)
            res = {
                "username":user.username,
                "fullname":f"{user.first_name} {user.last_name}",
                "email":user.email,
                "avatar":avatar.avatar.url if avatar.avatar else None,
            }
            return Response(res, status=200)
        return Response({"ctxt":"not authenticated"}, status=401)
    
    @class_login_check
    async def post(self, request, *args, **kwargs):
        try:
            user = await sync_to_async(authenticate)(username = request.data['username'], password = request.data['password'])
            if user is None:
                return Response({"ctxt": "invalid credentials"}, status=401)
            if user.is_active:
                await sync_to_async(login)(request, user)
                return Response({"ctxt":"logged in"}, status=200)
        except:
            return Response({"ctxt":"bad request"}, status=400)
        
@api_view(["POST"])
async def api_logout(request):
    await sync_to_async(logout)(request)
    return Response({"ctxt":"logged out successfully"}, status=200)

@api_view(['POST'])
async def ai(request):
    async with httpx.AsyncClient() as client:
        res = await client.post(os.getenv("N8N_LINK"), json={"prompt":request.data['prompt']}, timeout=5000)
        output = json.loads(await res.aread())["output"]
    ai_gen = Story(title=output["title"], content=output["content"])
    await ai_gen.asave()
    output["uuid"] = ai_gen.uuid
    return Response(data=output, status=200)