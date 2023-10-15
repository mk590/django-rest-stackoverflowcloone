from rest_framework import serializers
from stackoverflow.models import Acomment,QComment,Tag,Answer,Question,CustomUser

class UserSerializer(serializers.ModelSerializer):
    #  additional fields
    # user_password=serializers.CharField(write_only=True) 
    #  making it write only  ->only be used during the deserialization (input) process
    #  no need of adding it here 
    
    class Meta:
        model=CustomUser
        # fields=['first_name','last_name','email','password'] this is not done here as this will wxpose the password if by chance we make any get request the password will also be sent 
        fields=['first_name','last_name','email']
        
        def create(self,validated_data):
            #  validated data mein se sari key ki value se data lekar model instance create karna hoga but ek key extra hai (password wali ) to instance create mein issue so remove and store that separately taki bad mein instance ko create aur database mein save hone se pahle password set kar sake 
            
            password=validated_data.pop('password',None)
            instance=super().create(validated_data)
            if password:
                instance.set_password(password)
                instance.save() #this will save this model instance in our database
            return instance
        
        def update(self,instance,validated_data):
            password=validated_data.pop('password',None)
            instance=super().update(validated_data)
            if password:
                instance.set_password(password)
                instance.save() #this will save this model instance in our database
            return instance
            
            
            
        
  
  
class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['text']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Comment
        fields = ['text']
        
class QuestionSerializer(serializers.ModelSerializer):
    author=serializers.ReadOnlyField(source='author.username')
    answers = AnswerSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model=Question
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
    
    
    

#  not to include the password field directly in the serializer. Instead, you would handle password-related operations separately
#  in normal
# for the password first take all the fields that are in the model 
#  now we add an additional field in the serializer password 
#  when the data will come from the request then all the keys will be validated and the value with the password key will be fetched separaetely 
#  now there is an additional property of the model we want to save so need to modify the create method of the serializer
''' 
Here's what typically happens when you call super().create(validated_data):

Initialization: The create method in the ModelSerializer class initializes a new instance of the model (CustomUser in this case) with the data from validated_data. It doesn't handle special cases like setting the password or other custom logic specific to your application.

Instance Creation: It creates an instance of the model using the data from validated_data. At this point, the instance is not saved to the database yet.

Return Instance: The create method returns the created instance.
'''