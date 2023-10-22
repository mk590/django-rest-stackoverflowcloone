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

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id','first_name','last_name']

class QCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = QComment
        fields = ['id','body','author','created_time','question']
        read_only_fields=['author','question']
        
class ACommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Acomment
        fields=['id','body','author','created_time','answer']     
        read_only_fields=['author','answer']  

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tag
        fields=['id','name']        
        
class QuestionBaseSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    tags=TagSerializer(many=True,read_only=True)
    comments=QCommentSerializer(many=True,read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'title', 'body', 'author', 'upvotes', 'downvotes', 'created_at', 'updated_at', 'upvoted_by', 'downvoted_by', 'tags', 'image','comments']

class QuestionCreateSerializer(QuestionBaseSerializer):
    # read_only_fields = ['author'] inherit in teh below way otherwise causes error here 
    class Meta(QuestionBaseSerializer.Meta):
        read_only_fields = ['author']

    def create(self, validated_data):
        # Automatically set the author based on the authenticated user
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)

class QuestionRetrieveSerializer(QuestionBaseSerializer):
    author = UserSerializer(read_only=True)
       
    def update(self, instance, validated_data):
        instance.title=validated_data.get('title',instance.title)
        instance.body=validated_data.get('body',instance.body)
        request=self.context.get('request')
        if request and hasattr(request,'user'):
            user=request.user
            if 'upvotes' in validated_data:
                if user in instance.upvoted_by.all():
                    instance.upvoted_by.remove(user)
                    instance.upvotes-=1
                else:
                    instance.upvoted_by.add(user)
                    instance.upvotes+=1
                    if user in instance.downvoted_by.all():
                        instance.downvoted_by.remove(user)
                        instance.downvotes -= 1
            elif 'downvotes' in validated_data:
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
        return instance


             
class AnswerBaseSerializer(serializers.ModelSerializer):
    comments=ACommentSerializer(many=True,read_only=True)
    class Meta:
        model = Answer
        fields = ['id', 'body', 'author', 'upvotes', 'downvotes','created_at','upvoted_by', 'downvoted_by','question']


class AnswerCreateSerializer(AnswerBaseSerializer):
    class Meta(AnswerBaseSerializer.Meta):
        read_only_fields = ['author','question']
        
        
class AnswerRetrieveSerializer(AnswerBaseSerializer):
        author=UserSerializer(read_only=True)
        

            
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