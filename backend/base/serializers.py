from rest_framework import serializers
from .models import Room, RoomCategory, Message, Adult, Child, Booking, Feedback
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_superuser',
                  'date_joined', 'last_login', 'is_authenticated']

        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = RoomCategory
        fields = "__all__"


class AddRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ['category', 'image1', 'image2', 'image3', 'image4']


class RoomSerializer(serializers.ModelSerializer):

    category = serializers.SerializerMethodField('get_category')

    class Meta:
        model = Room
        fields = ['category', 'image1', 'image2', 'image3', 'image4', 'id']

    def get_category(self, room):
        serializer = CategorySerializer(room.category, many=False)
        return serializer.data


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class AdultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adult
        fields = '__all__'


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = '__all__'


class BookingAddSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):

    childs = serializers.SerializerMethodField('get_childs')
    adults = serializers.SerializerMethodField('get_adults')
    room = serializers.SerializerMethodField('get_room')

    class Meta:
        model = Booking
        fields = '__all__'

    def get_childs(self, booking):
        arr = []
        for child in booking.childs.all():
            childse = ChildSerializer(child, many=False)
            arr.append(childse.data)
        return arr

    def get_adults(self, booking):
        arr = []
        for adult in booking.adults.all():
            adultse = AdultSerializer(adult, many=False)
            arr.append(adultse.data)
        return arr

    def get_room(self, booking):
        room = RoomSerializer(booking.room, many=False)
        return room.data


class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedback
        fields = '__all__'
