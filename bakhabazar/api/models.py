from django.db import models


from django.db import models
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from modules.api import Hasher
from modules.api import tts
from datetime import date
from asgiref.sync import async_to_sync

class Entity(Hasher, models.Model):
    
    name = models.CharField(max_length=40, blank=False)
    alternate_names = models.JSONField(default=list, null=True, blank=True)
    content = models.CharField(max_length=20000)
    picture = models.ImageField(upload_to="entity_image/",null=True, blank=True)
    story = models.ManyToManyField('Story', related_name="entities", blank=True)
    legend = models.ManyToManyField('Legend', related_name="entities", blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    uuid = models.CharField(max_length=10,editable=False, null=False)
    
    def __str__(self):
        return self.name
    
    
class Story(Hasher, models.Model):
    
    title = models.CharField(max_length=40, blank=False)
    content = models.CharField(max_length=20000, blank=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to="story_image/",null=True, blank=True)
    audio = models.FileField(upload_to="story_audio/", null=False, editable=False)
    srt = models.JSONField(editable=False, blank=True, null=True)
    uuid = models.CharField(max_length=10,editable=False, null=False)
        
    def __str__(self):
        return self.title
    
    async def asave(self, *args, **kwargs):
        audio = await tts(str(self.content))
        await super().asave(*args, **kwargs)
        self.audio = ContentFile(audio.getvalue(), name=f"{self.uuid}.wav")
        return await super().asave()
    
    def save(self, *args, **kwargs):
        audio = async_to_sync(tts)(str(self.content))
        super().save(*args, **kwargs)
        self.audio = ContentFile(audio.getvalue(), name=f"{self.uuid}.wav")
        return super().save(*args, **kwargs)


class Legend(Hasher, models.Model):
    
    title = models.CharField(max_length=40, blank=False)
    content = models.CharField(max_length=20000, blank=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to="legend_image/",null=True, blank=True)
    audio = models.FileField(upload_to="legend_audio/", blank=False, editable=False)
    srt = models.JSONField(editable=False, blank=True, null=True)
    uuid = models.CharField(max_length=10,editable=False, null=False)
        
    def __str__(self):
        return self.title
    
    async def asave(self, *args, **kwargs):
        audio = await tts(str(self.content))
        await super().asave(*args, **kwargs)
        self.audio = ContentFile(audio.getvalue(), name=f"{self.uuid}.wav")
        return await super().asave()
    
    def save(self, *args, **kwargs):
        audio = async_to_sync(tts)(str(self.content))
        super().save(*args, **kwargs)
        self.audio = ContentFile(audio.getvalue(), name=f"{self.uuid}.wav")
        return super().save(*args, **kwargs)
    
    
class Like(Hasher, models.Model):
    user = models.ForeignKey(User, related_name="likes",blank=True, null=True, on_delete=models.CASCADE)
    story = models.ForeignKey(Story, blank=True, null=True, related_name="likes", on_delete=models.CASCADE)
    legend = models.ForeignKey(Legend, blank=True, null=True, related_name="likes", on_delete=models.CASCADE)
    comment = models.ForeignKey('Comment', blank=True, null=True, related_name="likes", on_delete=models.CASCADE)
    uuid = models.CharField(max_length=10, editable=False, null=True)
    
    async def asave(self, *args, **kwargs):
        if sum([bool(self.story), bool(self.legend), bool(self.comment)]) != 1:
            raise KeyError
        else:
            await super().asave()
            
    async def get_content(self, *args, **kwargs):
        content, content_type = (self.story, "story") if self.story != None else (self.legend, "legend")
        return content, content_type
    
    def __str__(self):
        return self.user.username



class Comment(Hasher, models.Model):
    comment = models.CharField(max_length=2000, blank=False, null=False)
    author = models.ForeignKey(User, related_name="comment_user", on_delete=models.CASCADE, blank=False)
    story = models.ForeignKey(Story, related_name="comment" ,on_delete=models.CASCADE, blank=True, null=True)
    legend = models.ForeignKey(Legend, related_name="comment", on_delete=models.CASCADE, blank=True, null=True)
    uuid = models.CharField(max_length=10, editable=False, null=True)
    
    def __str__(self):
        
        return str(self.uuid)
    
    async def asave(self, *args, **kwargs):
        if (self.story == None and self.legend == None) or (self.story and self.legend):
            raise KeyError
        else:
            await super().asave(*args, **kwargs)
            
    def save(self, *args, **kwargs):
        if (self.story == None and self.legend == None) or (self.story and self.legend):
            raise KeyError
        else:
            super().save(*args, **kwargs)
            
class Avatar(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=False, null=False, related_name='avatar')
    avatar = models.ImageField(upload_to='avatar', null=True, blank=True)
    dob = models.DateField(null=False, blank=False, default=date.today)
    
    def __str__(self):
        return self.user.usernameass