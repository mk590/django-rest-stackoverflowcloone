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
    class Meta:
        model=Question
        fields=['text','tags','author','created_at']
        author=serializers.ReadOnlyField(source='author.username')