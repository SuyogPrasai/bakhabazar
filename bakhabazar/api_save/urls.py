from django.urls import path
from .views import entity_post, story_post, legend_post, comment_post, like_post

urlpatterns = [
    path('entity/', entity_post),
    path('story/', story_post),
    path('legend/', legend_post),
    path('comment/', comment_post),
    path('like/', like_post)
]