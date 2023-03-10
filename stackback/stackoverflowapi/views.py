from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from stackoverflow.models import Question
from .serializers import QuestionSerializer,UserSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly,AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class PostList(generics.ListCreateAPIView):
    queryset=Question.objects.all()
    serializer_class=QuestionSerializer
    # permission_classes=[IsAuthenticatedOrReadOnly]
    permission_classes=[IsAuthenticated]
    
class UserRegister(APIView):
    permission_classes=[AllowAny]
    
    def post(self,request,format=None):
        serialized_data=UserSerializer(data=request.data)
        if serialized_data.is_valid():
            user=serialized_data.save()
            user.is_active=True
            user.save()
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response(serialized_data.errors,status=status.HTTP_400_BAD_REQUEST)

            
            


