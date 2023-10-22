from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from stackoverflow.models import Acomment,QComment,Tag,Answer,Question,CustomUser
from .serializers import QuestionCreateSerializer,QuestionRetrieveSerializer,UserSerializer,AnswerRetrieveSerializer,AnswerCreateSerializer,QCommentSerializer,ACommentSerializer,UserDetailSerializer
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
        
class UserDetailView(APIView): 
    permission_classes=[IsAuthenticated]
    
    def get(self,request,format=None):
        user_received=request.user
        serialized=UserDetailSerializer(user_received)
        return Response(serialized.data)
 
class UserLogout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class QuestionListView(generics.ListAPIView):
    queryset=Question.objects.all()
    serializer_class=QuestionRetrieveSerializer
    permission_classes=[IsAuthenticatedOrReadOnly]
    
    
class QuestionCreateView(generics.CreateAPIView):
    queryset=Question.objects.all()
    serializer_class=QuestionCreateSerializer
    permission_classes=[IsAuthenticated]
    

class QuestionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionRetrieveSerializer
    permission_classes=[IsAuthenticated]
 
    
class AnswerListView(generics.ListAPIView):
    queryset=Answer.objects.all()
    serializer_class=AnswerRetrieveSerializer
    permission_classes=[AllowAny]

class Qans(generics.ListAPIView):
    serializer_class=AnswerRetrieveSerializer
    permission_classes=[IsAuthenticated] 
    
    def get_queryset(self):
        ques_id=self.kwargs['question_id']
        queryset=Answer.objects.filter(question=ques_id)
        return queryset
    
class AnswerCreateView(generics.CreateAPIView):
    queryset=Answer.objects.all()
    serializer_class=AnswerCreateSerializer
    permission_classes=[IsAuthenticated]


    def perform_create(self, serializer):
        # Set the author to the current user making the request
        serializer.validated_data['author'] = self.request.user

        # Set the question based on the question_id in the request data
        question_id = self.request.data.get('question')
        serializer.validated_data['question_id'] = question_id
        serializer.save()
    

class AnswerView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerCreateSerializer
    permission_classes=[IsAuthenticated]
    
    #  one way of doung the update is what we used in the answercreate 
    def perform_update(self, serializer):
        instance=serializer.instance
        request=self.request
        instance.body=request.data.get('body',instance.body)
        if request and hasattr(request,'user'):
            user=request.user
            if 'upvotes' in request.data:
                if user in instance.upvoted_by.all():
                    instance.upvoted_by.remove(user)
                    instance.upvotes-=1
                else:
                    instance.upvoted_by.add(user)
                    instance.upvotes+=1
                    if user in instance.downvoted_by.all():
                        instance.downvoted_by.remove(user)
                        instance.downvotes -= 1
            elif 'downvotes' in request.data:
                if user in instance.downvoted_by.all():
                    instance.downvoted_by.remove(user)
                    instance.downvotes-=1
                else:
                    instance.downvoted_by.add(user)
                    instance.downvotes += 1
                    if user in instance.upvoted_by.all():
                        instance.upvoted_by.remove(user)
                        instance.upvotes -= 1
                
            instance.save()
        return super().perform_update(serializer)
    
    #  this is another way and provide better control 
    #  view ke hi update ko modify and during this we access serializer and pass the data
    #  but also need a lot more of the work so use the first syntax 
    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data)
    #     serializer.is_valid(raise_exception=True)
        
    #     # Add custom logic before updating the object

    #     self.perform_update(serializer)

    #     return Response(serializer.data)
    
    
class QCommentView(generics.ListAPIView):
    queryset=QComment.objects.all()
    serializer_class=QCommentSerializer
    permission_classes=[IsAuthenticated]
    
class QCommentSpecificView(generics.ListAPIView):
    serializer_class=QCommentSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        queryset=QComment.objects.filter(question_id=self.kwargs['question_id'])
        return queryset
    
class QCCreateView(generics.CreateAPIView):
    queryset=QComment.objects.all()
    serializer_class=QCommentSerializer
    permission_classes=[IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.validated_data['author']=self.request.user
        question_id=self.request.data.get('question')
        # serializer.validated_data['question']=question_id
        # serializer.validated_data['question_id']=question_id htis should work idealy but not working why 
        question_instance=Question.objects.get(id=question_id)
        serializer.validated_data['question']=question_instance
        serializer.save()
  

class QCDetailView(generics.RetrieveDestroyAPIView):
    queryset=QComment.objects.all()
    serializer_class=QCommentSerializer
    permission_classes=[IsAuthenticated]
  
    
class ACommentView(generics.ListAPIView):
    queryset=Acomment.objects.all()
    serializer_class=ACommentSerializer
    permission_classes=[IsAuthenticated]
    
class ACommentSpecificView(generics.ListAPIView):
    serializer_class=ACommentSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        queryset=Acomment.objects.filter(answer_id=self.kwargs['answer_id'])
        return queryset
    
class ACCreateView(generics.CreateAPIView):
    queryset=Acomment.objects.all()
    serializer_class=ACommentSerializer
    permission_classes=[IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.validated_data['author']=self.request.user
        answer_id=self.request.data.get('answer')
        answer_instance=Answer.objects.get(id=answer_id)
        serializer.validated_data['answer']=answer_instance
        serializer.save()
  

class ACDetailView(generics.RetrieveDestroyAPIView):
    queryset=Acomment.objects.all()
    serializer_class=ACommentSerializer
    permission_classes=[IsAuthenticated]
    
