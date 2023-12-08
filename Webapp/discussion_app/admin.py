from django.contrib import admin
from .models import Discussion, Message, DiscussionUser

admin.site.register(Discussion)
admin.site.register(Message)
admin.site.register(DiscussionUser)