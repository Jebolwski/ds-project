from django.contrib import admin
from .models import Room, Booking, RoomCategory, Message, Receptionist, Child, Adult, Feedback
# Register your models here.
admin.site.register(Room)
admin.site.register(Booking)
admin.site.register(RoomCategory)
admin.site.register(Message)
admin.site.register(Receptionist)
admin.site.register(Adult)
admin.site.register(Child)
admin.site.register(Feedback)
