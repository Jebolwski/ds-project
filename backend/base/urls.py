from django.urls import path, include
from . import views
from rest_auth.views import PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('', views.Routes),

    path('user/password/reset/', PasswordResetView.as_view(),
         name='rest_password_reset'),
    path('user/password/reset/confirm/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # TODO Auth
    path('rest-auth/google/', views.GoogleLogin.as_view()),
    path('auth/', include('dj_rest_auth.urls')),
    path('register', views.Register),
    path('is-superuser', views.GetIsSuperUser),

    # TODO Room
    path('room/<int:id>', views.GetARoom),
    path('room-category/all', views.GetAllRoomsCategorys),
    path('room-category/<int:id>', views.GetACategory),
    path('room-category/<int:id>/delete', views.DeleteCategory),
    path('room-category/add', views.AddRoomCategory),
    path('room/add', views.AddRoom),
    path('room/<int:id>/update', views.UpdateRoom),
    path('room/<int:id>/delete', views.DeleteRoom),
    path('room/most-popular', views.MostPopularRooms),

    # TODO Book
    path('room/search', views.SearchRoom),
    path('booking/<int:id>', views.GetBooking),
    path('room/book-rec', views.CreateBookingReception),
    path('booking/<int:id>/delete', views.RemoveBooking),
    path('payment', views.Payment),

    # TODO Feedback
    path('feedback/add', views.FeedbackRoom),
    path('feedback/<int:id>/delete', views.DeleteFeedback),


    # TODO Message
    path('message/send', views.SendMessage),
    path('message/<int:id>/delete', views.DeleteMessage),
]
