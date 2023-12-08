from .models import Discussion, Message, DiscussionUser
from .serializers import DiscussionSerializer, DiscussionUserSerializer, MessageSerializer
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User

class DiscussionMainAPI(generics.GenericAPIView):
    print("Reached Backend")
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer
    def get(self, request):
        discussionUsers = DiscussionUser.objects.filter(user = request.user.id)
        discussionIDs = discussionUsers.values_list('discussion', flat=True)
        discuss = Discussion.objects.filter(id__in=discussionIDs)
        serializer = self.get_serializer(discuss, many=True)
        return Response(serializer.data)

class MessagingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    def get(self, request, di):
        messages = Message.objects.filter(discussion = di)
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        msg = serializer.save()
        return Response({"message" : MessageSerializer(msg, self.get_serializer_context()).data})

class NewDiscussionAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = DiscussionSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer({})
        serializer.is_valid(raise_exception = True)
        discuss = serializer.save()
        return Response({"discuss" : DiscussionSerializer(discuss, self.get_serializer_context()).data})
    
class NewDiscussionUserAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = DiscussionUserSerializer
    def post(self, request, *args, **kwargs):
        for datum in request.data:
            serializer = self.get_serializer(data = datum)
            serializer.is_valid(raise_exception = True)
            du = serializer.save()
        return Response({"DiscussionUser" : DiscussionUserSerializer(du, self.get_serializer_context()).data})