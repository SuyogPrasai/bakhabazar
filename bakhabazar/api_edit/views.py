from adrf.decorators import api_view
from api.models import Like
from rest_framework.response import Response

@api_view(["GET"])
async def like_remove(request):
    try:
        uuid = request.query_params.get("uuid")
        content_type = request.query_params.get("content_type")
        if uuid:
            inst = await request.user.likes.aget(**{f"{content_type}__uuid":uuid})
        else:
            return Response({"ctxt":"uuid doesnot exist"},status=400)
    except Like.DoesNotExist:
        return Response({"ctxt":"uuid doesnot exist"},status=400)
    if inst.user == request.user:
        await inst.adelete()
        return Response({"ctxt":"Deleted"},status=200)
    return Response(status=400)

