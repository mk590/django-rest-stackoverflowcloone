from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register([Acomment,QComment,Answer,Tag,Question,CustomUser])
