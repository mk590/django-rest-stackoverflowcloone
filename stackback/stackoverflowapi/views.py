from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from stackoverflow.models import Question,Answer,Comment
from .serializers import QuestionSerializer,UserSerializer,AnswerSerializer,CommentSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly,AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

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
        
        
class QuestionList(generics.ListCreateAPIView):
    queryset=Question.objects.all()
    serializer_class=QuestionSerializer
    permission_classes=[IsAuthenticated]
    
    def perform_create(self, serializer):
     serializer.save(author=self.request.user)
    
class AnswerList(generics.ListAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    
class AnswerCreate(generics.CreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def post(self, request, question_id):
        # Get the question by its ID
        question = Question.objects.get(pk=question_id)

        # Create a new answer object with the question ID set
        answer = Answer(question=question, **request.data)

        # Validate the data and save the answer
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def post(self, request, question_id):
        # Get the question by its ID
        question = Question.objects.get(pk=question_id)

        # Create a new answer object with the question ID set
        comment = Comment(comment_question=question, **request.data)

        # Validate the data and save the answer
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class QuestionDetail(generics.RetrieveDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    

            
from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


from rest_framework_simplejwt.tokens import RefreshToken
class BlacklistTokenUpdateView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)