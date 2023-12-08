from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4


class Discussion(models.Model):#title-discussion title, created_at/last_message-date and time the discussion was created/last message was sent
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_message = models.DateTimeField(null=True, auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, default="")  # added default string to here so that migrations can be made 12/5/23

    def __str__(self):
        return self.title

class Message(models.Model):#discussion-discussion id for the message, user-user id of message sender, post_content-the message content, post_date-date and time the message was sent
    discussion = models.ForeignKey(Discussion, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    post_content = models.CharField(max_length=1000)
    post_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.post_date}"

class DiscussionUser(models.Model):#Connects users to discussions, discussion/user-id of the discussion/user
    discussion = models.ForeignKey(Discussion, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
