from django.urls import path
from .views import UserRegister,QuestionCreateView,QuestionListView,QuestionView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('register/',UserRegister.as_view(),name='user_register'),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('question-create/',QuestionCreateView.as_view(),name='question_create'),
    path('questions-list/',QuestionListView.as_view(),name='question_list'),
    path('question/<int:pk>/', QuestionView.as_view(),name='detail-view'),
    # path('answers/', AnswerList.as_view()),
    # path('comments/', CommentList.as_view()),
    # path('question/<int:question_id>/answers/', AnswerCreate.as_view()),
    # path('question/<int:question_id>/comments/', CommentCreate.as_view()),
    # path('logout/blacklist/',BlacklistTokenUpdateView.as_view(),
    #      name='blacklist')
    
]
