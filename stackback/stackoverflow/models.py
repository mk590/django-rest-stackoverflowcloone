from django.db import models

#  creating cutom user 
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

#  creating manager for custom user model from the default manager
class CustomUserManager(BaseUserManager):
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password) #this field takes the raw password and store the hased password in the system 
        user.save(using=self._db) # parameter is optional , this is done to perform the user add operation on the same database 
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager() #making the default manager of the customuser model 

    USERNAME_FIELD = 'email'
    #  this field is crucial as it is used to uniquely identify the user , must be done before creating any user and all otherwise painful migrations
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.first_name


class Question(models.Model):
    title = models.CharField(max_length=255,unique=True)
    body = models.TextField()
    author=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='questions')
    upvotes = models.PositiveIntegerField(default=0)
    downvotes = models.PositiveIntegerField(default=0)
    num_answers = models.PositiveIntegerField(default=0)
    num_comments = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    upvoted_by = models.ManyToManyField(CustomUser, blank=True,related_name='upvoted_questions')
    downvoted_by = models.ManyToManyField(CustomUser, blank=True,related_name='downvoted_questions')
    tags = models.ManyToManyField('Tag')
    image = models.ImageField(upload_to="images/", blank=True,null=True)
    def __str__(self):
        return self.title

    def get_tags_display(self):
        return [choice[1] for choice in self.GENRE_CHOICES if choice[0] in self.tags]

    
class Tag(models.Model):
    name=models.CharField(max_length=300)
    
    def __str__(self):
        return self.name
    

class Answer(models.Model):
    body=models.CharField(max_length=200)
    author=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="answers")
    question=models.ForeignKey(Question,on_delete=models.CASCADE,related_name='quesanswers')
    upvotes = models.PositiveIntegerField(default=0)
    downvotes = models.PositiveIntegerField(default=0)
    num_answers = models.PositiveIntegerField(default=0)
    num_comments = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('question', 'author')
        ordering = ['created_at']
        
    def __str__ (self):
        return self.body
    
class QComment(models.Model):
    body=models.CharField(max_length=200)
    author=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="quescomments")
    created_time=models.DateTimeField(auto_now_add=True)
    question=models.ForeignKey(Question,on_delete=models.CASCADE,null=True,related_name='quescomments')

    def __str__(self):
        return f"commet by {self.author} on {self.question}"

class Acomment(models.Model):
    body=models.CharField(max_length=200)
    author=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="anscomments")
    created_time=models.DateTimeField(auto_now_add=True)
    answer=models.ForeignKey(Question,on_delete=models.CASCADE,null=True,related_name='anscomments')

    def __str__(self):
        return f"commet by {self.author} on {self.answer}"



#  use of reverse relationship 
#  question se author fetch through foreign key 
#  now think if we want to fetch all the question written by user then we have to check all the blogs and filter out those that are written by user but by using we can directly do teh username.questions
#  here question is the name entered in the related field during makeing the foreign key 


# You don't need to explicitly define a password field in your custom user model, as it is inherited from the base user classes.
# but when creating or updating password we have to pass these fields in the serializers but since these are not in the models so handled a bit differently 
#  see serializers file


# **** related name same nahi dena hai other wise issue

