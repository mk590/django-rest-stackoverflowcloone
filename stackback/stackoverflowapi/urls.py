from django.urls import path
from .views import PostList,UserRegister
from .views import MyObtainTokenPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('questions/',PostList.as_view(),name='question_list'),
    path('user-register',UserRegister.as_view(),name='user_register'),
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
