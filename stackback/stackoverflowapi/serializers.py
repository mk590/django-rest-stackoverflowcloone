from rest_framework import serializers
from stackoverflow.models import Acomment,QComment,Tag,Answer,Question,CustomUser

class UserSerializer(serializers.ModelSerializer):
    #  additional fields
    password=serializers.CharField(write_only=True) 
    #  making it write only  ->only be used during the deserialization (input) process

    class Meta:
        model=CustomUser
        fields=['first_name','last_name','email','password']
        
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
        fields=['title','body','author','upvotes','downvotes','num_answers','num_comments','created_at','updated_at','upvoted_by','downvoted_by','tags','image']
        


''' 

 not to include the password field directly in the serializer. Instead, you would handle password-related operations separately
in normal
for the password first take all the fields that are in the model 
 now we add an additional field in the serializer password 
  when the data will come from the request then all the keys will be validated and the value with the password key will be fetched separaetely 
  now there is an additional property of the model we want to save so need to modify the create method of the serializer

Here's what typically happens when you call super().create(validated_data):

Initialization: The create method in the ModelSerializer class initializes a new instance of the model (CustomUser in this case) with the data from validated_data. It doesn't handle special cases like setting the password or other custom logic specific to your application.

Instance Creation: It creates an instance of the model using the data from validated_data. At this point, the instance is not saved to the database yet.

Return Instance: The create method returns the created instance.
'''