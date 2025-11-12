from adrf.views import APIView
from adrf.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@ensure_csrf_cookie
def csrf_ens(request):
    ctxt = {"ctxt":"provided"}
    return JsonResponse(data=ctxt)

@api_view(['GET'])
async def story(request):
    pass

