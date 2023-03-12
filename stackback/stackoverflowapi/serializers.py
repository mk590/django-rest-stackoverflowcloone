from rest_framework import serializers
from stackoverflow.models import Question,Answer,Comment
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    # questions=serializers.PrimaryKeyRelatedField(many=True,queryset=Question.objects.all())
    # answers=serializers.PrimaryKeyRelatedField(many=True,queryset=Answer.objects.all())
    # comments=serializers.PrimaryKeyRelatedField(many=True,queryset=Comment.objects.all())
    # this is done because all three are reverse realtionship on the user 
    class Meta:
        model=User
        fields=['username','password']
  
  
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['text']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text']
        
class QuestionSerializer(serializers.ModelSerializer):
    author=serializers.ReadOnlyField(source='author.username')
    # answers=serializers.StringRelatedField(many=True)
    # answers=serializers.RelatedField(many=True)
    # answers=serializers.RelatedField(many=True,queryset=Answer.objects.all())
    # answers=serializers.SlugRelatedField(many=True, slug_field='text',queryset=Answer.objects.all())
    answers = AnswerSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model=Question
        # fields=['text','tags','author','created_at']
        # fields=['text','author','created_at']
        # fields=['text','author','created_at','answers']
        fields=['text','author','created_at','answers','id','comments']
        

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    # what does this do 
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token