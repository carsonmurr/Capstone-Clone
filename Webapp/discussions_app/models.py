from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Discussion(models.Model):
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(User, related_name="discussions", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    discussion = models.ForeignKey(Discussion, related_name="messages", on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
