from django.contrib import admin
from api.models import Entity, Story, Legend, Comment, Like, Avatar

@admin.register(Entity)
class EntityAdmin(admin.ModelAdmin):
    fieldsets=[
        (
            None,
            {
                "fields":["name", "alternate_names","content","picture","author"]
            }
        
        ),
        (
            "Advanced Options",
            {
                "classes":["collapse"],
                "fields":["story","legend"]
            }
        )
    ]
    search_fields = ['name', "alternate_names"]
    filter_horizontal = ['story', 'legend'] 

@admin.register(Story, Legend)
class StoryAdmin(admin.ModelAdmin):
    search_fields = ['title']
    
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass

admin.site.register(Avatar)

#admin.site.register(Entity, EntityAdmin)
# Register your models here.