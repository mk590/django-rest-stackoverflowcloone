from django.urls import path
from .views import PostList,UserRegister

urlpatterns = [
    path('questions',PostList.as_view(),name='question_list'),
    path('user-register',UserRegister.as_view(),name='user_register'),
]
