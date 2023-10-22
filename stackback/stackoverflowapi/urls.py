from django.urls import path
from .views import UserRegister,QuestionCreateView,QuestionListView,QuestionView,AnswerListView,AnswerCreateView,AnswerView,QCommentView,QCommentSpecificView,QCCreateView,QCDetailView,ACommentView,ACommentSpecificView,ACCreateView,ACDetailView,UserDetailView,UserLogout,Qans
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('register/',UserRegister.as_view(),name='user_register'),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', UserLogout.as_view(), name='user_logout'),
    path('user-detail/', UserDetailView.as_view(), name='user_detail'),
    path('question-create/',QuestionCreateView.as_view(),name='question_create'),
    path('questions-list/',QuestionListView.as_view(),name='question_list'),
    path('question/<int:pk>/', QuestionView.as_view(),name='detail-view'),
    path('answers/', AnswerListView.as_view(),name='answer_list'),
    path('question/<int:question_id>/answers/', Qans.as_view(),name='answer_question'),
    path('answer/create/', AnswerCreateView.as_view(),name='answer_create'),
    path('answer/view/<int:pk>/', AnswerView.as_view(),name='answer_view'),
    path('qcomment-create/',QCCreateView.as_view(),name='qcomment_create'),
    path('qcomment-detail/<int:pk>/',QCDetailView.as_view(),name='qcomment_detail'),
    path('qcomment-list/',QCommentView.as_view(),name='qcomment_list'),
    path('question/<int:question_id>/comments/',QCommentSpecificView.as_view(),name='qcomment_specific'),
    path('acomment-create/', ACCreateView.as_view(),name='acomment_create'),
    path('acomment-detail/<int:pk>/', ACDetailView.as_view(),name='acomment_detail'),
    path('acomment-list/',ACommentView.as_view(),name='acomment_list'),
    path('answer/<int:answer_id>/comments/', ACommentSpecificView.as_view(),name='acomment_specific'),
    
]
