from rest_framework import serializers
from .models import Discussion, Message, DiscussionUser
from django.contrib.auth.models import User

#Serializer for Discussions
class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = ['id', 'title', 'created_at', 'last_message']

#Serializer for Messages
class MessageSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Message
        fields = ['id', 'discussion', 'user', 'post_content', 'post_date']
#Serializes the connection between users and discussions
class DiscussionUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = DiscussionUser
        fields = ['id', 'discussion', 'user']
