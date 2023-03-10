from django.db import models

from django.contrib.auth.models import User

class Question(models.Model):
    text=models.CharField(max_length=200)
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    tags=models.ForeignKey('Tag',on_delete=models.PROTECT,null=True)
    
    def __str__ (self):
        return self.text
    
class Tag(models.Model):
    text=models.CharField(max_length=300)
    
    def __str__(self):
        return self.text
    
class Comment(models.Model):
    text=models.CharField(max_length=200)
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    created_time=models.DateTimeField(auto_now_add=True)
    # comment_question=models.ForeignKey(Question,on_delete=models.CASCADE,null=True)
    comment_question=models.ForeignKey(Question,on_delete=models.CASCADE,null=True,blank=True)
    # comment_answer=models.ForeignKey('Answer',on_delete=models.CASCADE,null=True)
    comment_answer=models.ForeignKey('Answer',on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return self.text

class Answer(models.Model):
    text=models.CharField(max_length=200)
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    question=models.ForeignKey(Question,on_delete=models.CASCADE)
    
    def __str__ (self):
        return self.text
