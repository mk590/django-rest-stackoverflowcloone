from django.urls import path
from .views import PostList,UserRegister,AnswerList,PostDetail,AnswerCreate,CommentList,CommentCreate,BlacklistTokenUpdateView
from .views import MyObtainTokenPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('questions/',PostList.as_view(),name='question_list'),
    path('user-register/',UserRegister.as_view(),name='user_register'),
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('answers/', AnswerList.as_view()),
    path('comments/', CommentList.as_view()),
    path('question/<int:pk>/', PostDetail.as_view(),name='detail-view'),
    path('question/<int:question_id>/answers/', AnswerCreate.as_view()),
    path('question/<int:question_id>/comments/', CommentCreate.as_view()),
    path('logout/blacklist/',BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
