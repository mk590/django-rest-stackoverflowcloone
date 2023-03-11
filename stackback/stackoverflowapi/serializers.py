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
        
class QuestionSerializer(serializers.ModelSerializer):
    author=serializers.ReadOnlyField(source='author.username')
    
    class Meta:
        model=Question
        fields=['text','tags','author','created_at']
        

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    # what does this do 
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token