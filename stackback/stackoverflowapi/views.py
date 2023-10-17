from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from stackoverflow.models import Acomment,QComment,Tag,Answer,Question,CustomUser
from .serializers import QuestionCreateSerializer,QuestionRetrieveSerializer,QuestionUpdateSerializer,UserSerializer,AnswerSerializer,CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly,AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class UserRegister(APIView):
    permission_classes=[AllowAny]
    
    def post(self,request,format=None):
        serialized_data=UserSerializer(data=request.data)
        if serialized_data.is_valid():
            user=serialized_data.save()
            user.save()
            return Response(serialized_data.data,status=status.HTTP_200_OK)
        else:
            return Response(serialized_data.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
class QuestionListView(generics.ListAPIView):
    queryset=Question.objects.all()
    serializer_class=QuestionRetrieveSerializer
    permission_classes=[AllowAny]
    
    
class QuestionCreateView(generics.CreateAPIView):
    queryset=Question.objects.all()
    serializer_class=QuestionCreateSerializer
    permission_classes=[IsAuthenticated]
    

class QuestionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionRetrieveSerializer
    permission_classes=[IsAuthenticated]
    

    # def create(self,request,*args, **kwargs):
    #     serializer = self.serializer_class(data=request.data)
    #     print(request.user)
    #     serializer.is_valid(raise_exception=True)
    #     print(serializer.data)
    #     serializer.save(author=request.user)
    #     return Response(serializer.data,status=status.HTTP_201_CREATED)
    
# class AnswerList(generics.ListAPIView):
#     queryset = Answer.objects.all()
#     serializer_class = AnswerSerializer
    
# class AnswerCreate(generics.CreateAPIView):
#     queryset = Answer.objects.all()
#     serializer_class = AnswerSerializer

#     def post(self, request, question_id):
#         # Get the question by its ID
#         question = Question.objects.get(pk=question_id)

#         # Create a new answer object with the question ID set
#         answer = Answer(question=question, **request.data)

#         # Validate the data and save the answer
#         serializer = AnswerSerializer(answer, data=request.data)
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class CommentList(generics.ListAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer
    
# class CommentCreate(generics.CreateAPIView):
#     queryset = Comment.objects.all()
#     serializer_class = CommentSerializer

#     def post(self, request, question_id):
#         # Get the question by its ID
#         question = Question.objects.get(pk=question_id)

#         # Create a new answer object with the question ID set
#         comment = Comment(comment_question=question, **request.data)

#         # Validate the data and save the answer
#         serializer = CommentSerializer(comment, data=request.data)
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)