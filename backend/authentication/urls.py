from django.urls import path
from .views import CreateListUsersView,RetrieveUserView,UserLoginView,UserLogoutView

urlpatterns = [
    path('', CreateListUsersView.as_view(), name='create-list-users'),
    path('login', UserLoginView.as_view(), name='user-login'),
    path("<int:user_id>",RetrieveUserView.as_view(),name='get-user'),
    path('logout',UserLogoutView.as_view(),name='logout'),


]