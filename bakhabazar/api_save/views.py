from rest_framework.decorators import permission_classes, parser_classes
from adrf.decorators import api_view
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from .serializers import Entity_Serializer, Story_Serializer, Legend_Serializer, Comment_Serializer, Like_Serializer
from modules.api_save import Generic_Save

# Create your views here.
@api_view(["POST"])
@parser_classes([FormParser, MultiPartParser, JSONParser])
@permission_classes([IsAuthenticated])
async def entity_post(request):
    return await Generic_Save(Entity_Serializer, request)
    
    
@api_view(["POST"])
@parser_classes([FormParser, MultiPartParser, JSONParser])
@permission_classes([IsAuthenticated])
async def story_post(request):
    return await Generic_Save(Story_Serializer, request)
    
    
@api_view(["POST"])
@parser_classes([FormParser, MultiPartParser, JSONParser])
@permission_classes([IsAuthenticated])
async def legend_post(request):
    return await Generic_Save(Legend_Serializer, request)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
async def comment_post(request):
    return await Generic_Save(Comment_Serializer, request)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
async def like_post(request):
    return await Generic_Save(Like_Serializer, request)