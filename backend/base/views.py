from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes
from django.contrib.auth.models import User
from .serializers import RoomSerializer, AddRoomSerializer, MessageSerializer, CategorySerializer, FeedbackSerializer, AdultSerializer, ChildSerializer, BookingSerializer, BookingAddSerializer
from .models import Room, RoomCategory, Booking, Message, Receptionist, Feedback
from .forms import SignupForm
import datetime
from django.shortcuts import redirect
import stripe
from django.conf import settings
from django.shortcuts import get_object_or_404


class Node:

    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None
        self.end = None

    def addToHead(self, value):
        if self.head == None:
            self.head = Node(value)
            self.end = Node(value)
        else:
            node = Node(value)
            node.next = self.head
            self.head = node

    def addToEnd(self, value):
        if (self.head == None):
            self.head = Node(value)
        else:
            current = self.head
            while (current.next != None):
                current = current.next
            current.next = Node(value)

    def addSorted(self, value):
        if self.head == None:
            self.head = Node(value)
            self.end = Node(value)
        else:
            if self.head.value >= value:
                self.addToHead(value)
            else:
                temp = self.head
                while (temp.next != None) and (temp.next.value < value):
                    temp = temp.next
                node = Node(value)
                if temp.next:
                    node.next = temp.next
                    temp.next = node
                else:
                    temp.next = node

    def printList(self):
        if self.head == None:
            print("Liste boş")
            return
        temp = self.head
        while temp:
            print(temp.value, end=" | ")
            temp = temp.next
        print()

    def list(self):
        if self.head != None:
            arr = []
            temp = self.head
            while temp:
                arr.append(temp.value)
                temp = temp.next
            return arr
        else:
            return []


class Stack:

    def __init__(self):
        self.stack = []

    def push(self, val):
        self.stack.append(val)

    def pop(self):
        return self.stack.pop()

    def __str__(self):
        string = ""
        for i in self.queue:
            string += " | " + str(i) + " | "
        string += "\n"
        return string

    def print(self):
        for i in self.stack:
            print(" | " + str(i) + " | ")

    def __add__(self, other):
        self.stack = self.stack+other
        return self

    def peek(self):
        return self.stack[-1]


class Queue:

    def __init__(self):
        self.queue = []

    def enqueue(self, val):
        self.queue.insert(0, val)

    def dequeue(self):
        return self.stack.pop()

    def __str__(self):
        string = ""
        for i in self.queue:
            string += str(i) + " -> "
        string += "\n"
        return string

    def __add__(self, other):
        self.queue = self.queue+other
        return self

    def print(self):
        for i in self.queue:
            print(str(i) + " -> \n")

    def peek(self):
        return self.queue[-1]


stripe.api_key = settings.STRIPE_SECRET_KEY


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_authenticated'] = user.is_authenticated
        token['is_superuser'] = user.is_superuser

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def Routes(request):
    routes = [
        '/rest-auth/google/',
        '/auth/login',
        '/auth/logout',
        '/auth/user',
        '/auth/password/change',
        '/auth/password/reset',
        '/auth/password/reset/confirm',
        '/register',
        '/login/',
        '/profile/:id',
        '/profile/add',
        '/profile/update',
    ]

    return Response(routes)


@api_view(['POST'])
@permission_classes([AllowAny])
def Register(request):
    """Kullanıcı kaydı yapar. email, username, password1, password2 verilerini alır."""
    if request.data:
        if request.data.get('password1') != request.data.get('password2'):
            return Response({"msg_en": "Passwords dont match. 😞", "msg_tr": "Şifreler uyuşmuyor. 😞"}, status=400)
        queue = Queue()
        for i in User.objects.all():
            queue.enqueue(i.email)
        print(queue)
        if request.data.get('email') in queue.queue:
            return Response({"msg_en": "This email already in use. 😢", "msg_tr": "Girdiğiniz email kullanımda. 😢"}, status=400)
        form = SignupForm(request.data)
        if form.is_valid():
            form.save()
            return Response({"msg_en": "Successfully registered. ✨", "msg_tr": "Başarıyla kayıt olundu. ✨"}, status=200)
        else:
            print(form.errors)
            return Response({"msg_en": "Data is not valid. 🤨", "msg_tr": "Veri doğru değil. 🤨"}, status=400)
    else:
        return Response({"msg_en": "There was no data entered. 😒", "msg_tr": "Bize veri verilmedi. 😒"}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetIsSuperUser(request):
    try:
        if request.user.is_superuser:
            return Response({"is_superuser": True, "receptionist": True}, status=200)
        elif len(Receptionist.objects.filter(user=request.user)) > 0:
            return Response({"is_superuser": False, "receptionist": True}, status=200)
        else:
            return Response({"is_superuser": False, "receptionist": False}, status=200)
    except:
        return Response({"msg_en": "An error occurred. 😥", "msg_tr": "Bir hata oluştu. 😥"}, status=500)


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173/login"
    client_class = OAuth2Client


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([AllowAny])
def GetARoom(request, id):
    """
        Oteldeki bir odanın verilerini verir.
    """
    roomObject = Room.objects.filter(id=id)
    if len(roomObject) > 0:
        roomObject = roomObject[0]
        serializer = RoomSerializer(roomObject, many=False)
        return Response({"data": serializer.data}, status=200)
    else:
        return Response({"msg_en": "Couldnt find the room. 😥", "msg_tr": "Oda bulunamadı. 😥"}, status=400)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([AllowAny])
def GetACategory(request, id):
    """
        Oteldeki bir oda kategorisinin verilerini verir.
    """
    categoryObject = RoomCategory.objects.filter(id=id)
    if len(categoryObject) > 0:
        categoryObject = categoryObject[0]
        serializer = CategorySerializer(categoryObject, many=False)
        return Response({"data": serializer.data}, status=200)
    else:
        return Response({"msg_en": "Couldnt find the room category. 😥", "msg_tr": "Oda kategorisi bulunamadı. 😥"}, status=400)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def GetAllRooms(request):
    """Bütün odaları getirir. (resepsiyon ve yönetici yapabilir)"""
    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    recep = Room.objects.all().order_by('-create')
    serializer = RoomSerializer(recep, many=True)
    return Response({"data": serializer.data}, status=200)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def GetAllRoomsCategorys(request):
    """Bütün oda kategorilerini getirir. (resepsiyon ve yönetici yapabilir)"""
    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    recep = RoomCategory.objects.all()
    serializer = CategorySerializer(recep, many=True)
    return Response({"data": serializer.data}, status=200)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def AddRoomCategory(request):
    """
        Otele oda kategorisi ekler. name, max_adult,
        max_children, desc, price verilerini alır.
    """
    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    if request.data.get('name') == None:
        return Response({"msg_en": "You didnt enter category name. 😶", "msg_tr": "Kategori adını girmediniz. 😶"}, status=400)
    if request.data.get('max_adult') == None:
        return Response({"msg_en": "You didnt enter max number of adults. 😶", "msg_tr": "Maksimum yetişkin sayısını girmediniz. 😶"}, status=400)
    if request.data.get('max_children') == None:
        return Response({"msg_en": "You didnt enter max number of children. 😶", "msg_tr": "Maksimum çocuk sayısını girmediniz. 😶"}, status=400)
    if request.data.get('desc') == None:
        return Response({"msg_en": "You didnt enter description. 😶", "msg_tr": "Açıklamayı girmediniz. 😶"}, status=400)
    if request.data.get('price') == None:
        return Response({"msg_en": "You didnt enter price. 😶", "msg_tr": "Fiyatı girmediniz. 😶"}, status=400)

    category = CategorySerializer(data=request.data)
    if category.is_valid():
        category.save()
        return Response({"msg_en": "Successfully added the room. 😶", "msg_tr": "Oda başarıyla eklendi. 😶", "data": category.data}, status=200)
    else:
        print(category.errors)
        return Response({"msg_en": "Data is not valid. 🤨", "msg_tr": "Veri doğru değil. 🤨"}, status=400)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def AddRoom(request):
    """
        Otele oda ekler. image1,
        image2, image3, image4 verilerini alır.
    """
    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    if request.data.get('image1') == None and request.data.get('image2') == None and request.data.get('image3') == None and request.data.get('image4') == None:
        return Response({"msg_en": "You didnt enter any photos. 😶", "msg_tr": "Hiç fotoğraf girmediniz. 😶"}, status=400)
    data = request.data.copy()
    if data.get('category'):
        data['category'] = int(data.get('category'))
    room = AddRoomSerializer(data=data)
    if room.is_valid():
        room.save()
        return Response({"msg_en": "Successfully added the room. 😶", "msg_tr": "Oda başarıyla eklendi. 😶", "data": room.data}, status=200)
    else:
        print(room.errors)
        return Response({"msg_en": "Data is not valid. 🤨", "msg_tr": "Veri doğru değil. 🤨"}, status=400)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateRoom(request, id):
    """
        Oteldeki bir odayı günceller. max_adult, max_children, image1,
        image2, image3, image4 verilerini alır.
    """
    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    if request.data.get('image1') == None and request.data.get('image2') == None and request.data.get('image3') == None and request.data.get('image4') == None:
        return Response({"msg_en": "You didnt enter any photos. 😶", "msg_tr": "Hiç fotoğraf girmediniz. 😶"}, status=400)
    data = request.data.copy()

    if request.data.get('image1_clear') != None:
        data['image1'] = None
    if request.data.get('image2_clear') != None:
        data['image2'] = None
    if request.data.get('image3_clear') != None:
        data['image3'] = None
    if request.data.get('image4_clear') != None:
        data['image4'] = None

    roomObject = Room.objects.filter(id=id)
    if len(roomObject) > 0:
        roomObject = roomObject[0]
    else:
        return Response({"msg_en": "Couldnt find the room. 😥", "msg_tr": "Oda bulunamadı. 😥"}, status=400)

    room = AddRoomSerializer(data=data, instance=roomObject)
    if room.is_valid():
        room.save()
        return Response({"msg_en": "Successfully updated the room. 😶", "msg_tr": "Oda başarıyla güncellendi. 😶", "data": room.data}, status=200)
    else:
        print(room.errors)
        return Response({"msg_en": "Data is not valid. 🤨", "msg_tr": "Veri doğru değil. 🤨"}, status=400)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def DeleteRoom(request, id):
    """
        Oteldeki bir odayı siler.
    """
    roomObject = Room.objects.filter(id=id)
    if len(roomObject) > 0:
        roomObject = roomObject[0]
    else:
        return Response({"msg_en": "Couldnt find the room. 😥", "msg_tr": "Oda bulunamadı. 😥"}, status=400)
    roomObject.delete()
    return Response({"msg_en": "Successfully deleted the room. 😄", "msg_tr": "Oda başarıyla kaldırıldı. 😄"}, status=200)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def DeleteCategory(request, id):
    """
        Oteldeki bir oda kategorisini siler.
    """
    categoryObject = RoomCategory.objects.filter(id=id)
    if len(categoryObject) > 0:
        categoryObject = categoryObject[0]
    else:
        return Response({"msg_en": "Couldnt find the room category. 😥", "msg_tr": "Oda kategorisi bulunamadı. 😥"}, status=400)
    categoryObject.delete()
    return Response({"msg_en": "Successfully deleted the room category. 😄", "msg_tr": "Oda kategorisi başarıyla kaldırıldı. 😄"}, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def SearchRoom(request):
    """
        Rezervasyon yaptırır. start, end, children, adult parametrelerini alır.
    """
    # iptal edilmiş ödemelerde oluşturulmuş rezervasyonların silinmesi
    allbook = Booking.objects.all()
    for i in allbook:
        if len(i.adults.all()) == 0:
            i.delete()

    if request.GET.get('start') == None:
        return Response({"msg_en": "You didnt enter start date. 😶", "msg_tr": "Giriş tarihini girmediniz. 😶"}, status=400)

    if datetime.datetime.strptime(request.GET.get('start'), '%Y-%m-%d').date() < datetime.date.now():
        return Response({"msg_en": "You cant book on a past date. 😶", "msg_tr": "Geçmiş bir tarihe rezervasyon yapamazsınız. 😞"}, status=400)

    if request.GET.get('end') == None:
        return Response({"msg_en": "You didnt enter end date. 😶", "msg_tr": "Çıkış tarihini girmediniz. 😶"}, status=400)

    if request.GET.get('children') == None:
        return Response({"msg_en": "You didnt enter children count. 😶", "msg_tr": "Çocuk sayısını girmediniz. 😶"}, status=400)

    if request.GET.get('adult') == None:
        return Response({"msg_en": "You didnt enter adult count. 😶", "msg_tr": "Yetişkin sayısını girmediniz. 😶"}, status=400)

    """
        istenilen kişi sayılarına göre oda türleri getiriliyor
    """
    categories = RoomCategory.objects.filter(max_adult__gte=request.GET.get(
        'adult')).filter(max_children__gte=request.GET.get('children'))

    """
        getirilen kategorilere sahip olan odalar getiriliyor
    """

    odalar = LinkedList()

    for i in categories:
        for j in Room.objects.filter(category=i):
            odalar.addToHead(j)

    stack = Stack()

    """
        odalara bakılarak boş olan odalar aranıyor
    """
    dataStart = datetime.datetime.strptime(
        request.GET.get('start'), '%Y-%m-%d').date()
    dataEnd = datetime.datetime.strptime(
        request.GET.get('end'), '%Y-%m-%d').date()
    temp = odalar.head
    while temp != None:
        bookings = Booking.objects.filter(room=temp.value)
        if len(bookings) > 0:
            flag = True
            for j in bookings:
                if not ((j.start >= dataEnd) or (j.end <= dataStart)):
                    flag = False
            if flag == True:
                stack.push(temp.value)
        else:
            stack.push(temp.value)
        temp = temp.next

    result = Stack()
    for i in stack.stack:
        if i != None or i != "":
            serializer = RoomSerializer(i, many=False)
            result.push(serializer.data)

    return Response({"data": result.stack}, status=200)


@api_view(['GET'])
def GetAllMessages(request):
    """Bütün mesajları getirir. (resepsiyon ve yönetici yapabilir)"""
    
    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)


    
    mess = Message.objects.all().order_by('-create')
    serializer = MessageSerializer(mess, many=True)
    return Response({"data": serializer.data}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def SendMessage(request):
    """Mesaj gönderir. message, mail, name, number verilerini alır."""
    if request.data.get('message') == None:
        return Response({"msg_en": "You didnt enter your message. 😶", "msg_tr": "Mesajı girmediniz. 😶"}, status=400)
    if request.data.get('mail') == None:
        return Response({"msg_en": "You didnt enter your mail. 😶", "msg_tr": "Maili girmediniz. 😶"}, status=400)
    if request.data.get('name') == None:
        return Response({"msg_en": "You didnt enter your name. 😶", "msg_tr": "Adınızı girmediniz. 😶"}, status=400)
    if request.data.get('number') == None:
        return Response({"msg_en": "You didnt enter your number. 😶", "msg_tr": "Numaranızı girmediniz. 😶"}, status=400)

    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg_en": "Successfully sent message. 🚀", "msg_tr": "Mesaj başarıyla gönderildi. 🚀", "data": serializer.data}, status=200)
    else:
        print(serializer.errors)
        return Response({"msg_en": "Data is not valid. 🤨", "msg_tr": "Verdiğiniz girdiler doğru girilmedi. 🤨"}, status=400)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def DeleteMessage(request, id):
    """Mesaj siler. (yönetici yapabilir)"""
    message = Message.objects.filter(id=id)
    if len(message) > 0:
        message = message[0]
    else:
        return Response({"msg_en": "Couldnt find the message. 😥", "msg_tr": "Mesaj bulunamadı. 😥"}, status=400)
    message.delete()
    return Response({"msg_en": "Successfully deleted message. 🌝", "msg_tr": "Mesaj başarıyla silindi. 🌝"}, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def MostPopularRooms(request):
    """En popüler 5 (varsa) tercih edilen odaları döndürür."""
    bookings = Booking.objects.all().order_by('room')
    dp = {}
    for i in bookings:
        if i.room in dp:
            dp[i.room] += 1
        else:
            dp[i.room] = 1
    dp = {k: v for k, v in sorted(
        dp.items(), key=lambda item: item[1], reverse=True)}
    arr = list(dp)[:min(len(dp), 5)]
    for i in range(len(arr)):
        serializer = RoomSerializer(arr[i], many=False)
        arr[i] = serializer.data
    return Response({"data": arr}, status=200)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CreateBookingReception(request):
    """Resepsiyonist veya yöneticinin bir kişi veya kişileri odaya rezerve etme."""

    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    if request.data.get('adults') == None:
        return Response({"msg_en": "You didnt enter adults. 🤨", "msg_tr": "Yetişkinlerin verilerini eklemedin. 🤨"}, status=400)

    if request.data.get('children') == None:
        return Response({"msg_en": "You didnt enter children. 🤨", "msg_tr": "Çocukların verilerini eklemedin. 🤨"}, status=400)

    if request.data:
        adults = Stack()
        children = Stack()
        for i in request.data.get('adults'):
            if i.get('name') and i.get('tcno'):
                adult = AdultSerializer(data=i, many=False)
                if adult.is_valid():
                    Adult = adult.save()
                    adults.push(Adult.id)

        for i in request.data.get('children'):
            if i.get('age') and i.get('tcno') and i.get('name'):
                child = ChildSerializer(data=i, many=False)
                if child.is_valid():
                    Child = child.save()
                    children.push(Child.id)

        data = {"childs": children.stack, "adults": adults.stack, "room": request.data.get(
            'room'), "start": request.data.get('start'), "end": request.data.get('end'), "user": request.user.id}
        booking = BookingAddSerializer(data=data, many=False)
        if booking.is_valid():
            book = booking.save()
            serializer = BookingSerializer(book, many=False)
            return Response({"msg_en": "Successfully added. 🌝", "msg_tr": "Başarıyla eklendi. 🌝", "data": serializer.data}, status=200)
        else:
            print(booking.errors)
            return Response({"msg_en": "Data is not valid. 😥", "msg_tr": "Veri doğru değil. 😥"}, status=400)
    else:
        return Response({"msg_en": "No data was given to us. 🥲", "msg_tr": "Bize veri verilmedi. 🥲"}, status=400)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def GetAllRezervations(request):
    """Bütün rezervasyonları getirir."""
    allRezerv = Booking.objects.all().order_by('-start')
    serializer = BookingSerializer(allRezerv, many=True)
    return Response({"data": serializer.data}, status=200)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def CancelBooking(request, id):
    """
        Rezervasyon iptal edilir, id parametresi alınır.
    """
    booking = Booking.objects.filter(id=id)
    if len(booking) > 0:
        booking = booking[0]
        if request.user == booking.user:
            diff = booking.start - datetime.date.today()
            if diff.days > 5:
                for child in booking.childs.all():
                    child.delete()
                for adult in booking.adults.all():
                    adult.delete()
                booking.delete()
                return Response({"msg_en": "Sucessfully cancelled booking. 🚀", "msg_tr": "Rezervasyon iptal edildi. 🚀"}, status=200)
            else:
                return Response({"msg_en": "Its too late to cancel rezervation. 😥", "msg_tr": "Rezervasyonu iptal etmek için çok geç. 😥"}, status=400)
        else:
            return Response({"msg_en": "This rezervation isnt yours. 🤔", "msg_tr": "Bu rezervasyon size ait değil. 🤔"}, status=400)
    else:
        return Response({"msg_en": "Couldnt find the booking. 😥", "msg_tr": "Rezervasyon bulunamadı. 😥"}, status=400)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def RemoveBooking(request, id):
    """
        Rezervasyon silinir, id parametresi alınır.
    """

    booking = Booking.objects.filter(id=id)
    if len(booking) > 0:
        booking = booking[0]
        for child in booking.childs.all():
            child.delete()
        for adult in booking.adults.all():
            adult.delete()
        booking.delete()
        return Response({"msg_en": "Sucessfully deleted booking. 🚀", "msg_tr": "Rezervasyon başrıyla silindi. 🚀"}, status=200)
    else:
        return Response({"msg_en": "Couldnt find the booking. 😥", "msg_tr": "Rezervasyon bulunamadı. 😥"}, status=400)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([AllowAny])
def FeedbackRoom(request):
    """Geri dönüş yaptırır.Room, text, name_surname, email, number verilerini alır."""
    if request.data.get('name_surname') == None:
        return Response({"msg_en": "You didnt enter your name. 🥲", "msg_tr": "Adını girmedin. 🥲"}, status=400)
    if request.data.get('email') == None:
        return Response({"msg_en": "You didnt enter your email. 😥", "msg_tr": "Emailini girmedin. 😥"}, status=400)
    if request.data.get('number') == None:
        return Response({"msg_en": "You didnt enter your number. 🤨", "msg_tr": "Numaranı girmedin. 🤨"}, status=400)
    if request.data.get('text') == None:
        return Response({"msg_en": "You didnt enter text. 😒", "msg_tr": "Metni girmedin. 😒"}, status=400)

    serializer = FeedbackSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg_en": "Your feedback has been saved. 🚀", "msg_tr": "Geri bildirimin kaydedildi. 🚀", "data": serializer.data}, status=200)
    else:
        return Response({"msg_en": "Data isnt valid. 😒", "msg_tr": "Veri doğru değil. 😒"}, status=400)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def DeleteFeedback(request, id):
    """Bir geri dönüşü siler, id parametresini alır."""
    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    feedback = Feedback.objects.filter(id=id)
    if len(feedback) > 0:
        feedback = feedback[0]
        feedback.delete()
        return Response({"msg_en": "Successfully deleted feedback. 😄", "msg_tr": "Geri dönüş başarıyla silindi. 😄"}, status=200)
    else:
        return Response({"msg_en": "Couldnt find the feedback. 😥", "msg_tr": "Geri dönüş bulunamadı. 😥"}, status=400)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def Payment(request):
    """Rezervasyon ödemesi ve veritabanına eklenmesi yapılır. price, product_name, start, end, adults, children verilerini alır"""
    if request.data.get('price') == None:
        return Response({"msg_en": "Price wasnt entered. 😥", "msg_tr": "Fiyat girilmedi. 😥"}, status=400)
    if request.data.get('product_name') == None:
        return Response({"msg_en": "Product name wasnt entered. 😒", "msg_tr": "Ürün adı girilmedi. 😒"}, status=400)

    price = request.data.get('price')
    product_name = request.data.get('product_name')
    idn = 0
    if (request.data.get('start') > request.data.get('end')):
        return Response({"msg_tr": "Giriş tarihi çıkış tarihinden büyük olamaz. 😶", "msg_en": "Check in date cant be bigger than check out date. 😶"}, status=400)

    if request.data.get('adults') == None or len(request.data.get('adults')) == 0:
        return Response({"msg_en": "You didnt enter adults. 🤨", "msg_tr": "Yetişkinlerin verilerini eklemedin. 🤨"}, status=400)
    if request.data.get('children') == None:
        return Response({"msg_en": "You didnt enter children. 🤨", "msg_tr": "Çocukların verilerini eklemedin. 🤨"}, status=400)
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[{
                'price_data': {
                    'currency': 'try',
                    'product_data': {
                        'name': product_name,
                    },
                    'unit_amount': price
                },
                'quantity': 1
            }],
            mode='payment',
            success_url="http://localhost:5173/checkout/success",
            cancel_url="http://localhost:5173/checkout/failed",
        )

        if request.data:
            adults = Stack()
            children = Stack()
            for i in request.data.get('adults'):
                if i.get('name') and i.get('tcno'):
                    adult = AdultSerializer(data=i, many=False)
                    if adult.is_valid():
                        Adult = adult.save()
                        adults.push(Adult.id)
                    else:
                        print(adult.errors)

            for i in request.data.get('children'):
                if i.get('age') and i.get('tcno') and i.get('name'):
                    child = ChildSerializer(data=i, many=False)
                    if child.is_valid():
                        Child = child.save()
                        children.push(Child.id)
                    else:
                        print(adult.errors)
            data = {"childs": children.stack, "adults": adults.stack, "room": request.data.get('room'),
                    "start": request.data.get('start'), "end": request.data.get('end'), 'user': request.user.id}

            booking = BookingAddSerializer(data=data, many=False)
            if booking.is_valid():
                book = booking.save()
                idn = book.id
                return Response({"url": checkout_session.get('url')}, status=200)
            else:
                print(booking.errors)
                return Response({"msg_en": "Data is not valid. 😥", "msg_tr": "Veri doğru değil. 😥"}, status=400)
        else:
            return Response({"msg_en": "No data was given to us. 🥲", "msg_tr": "Bize veri verilmedi. 🥲"}, status=400)

    except Exception as e:
        if idn != 0:
            feedback = Feedback.objects.filter(id=idn)
            if len(feedback) > 0:
                feedback = feedback[0]
                feedback.delete()
        print("==============")
        print(e)
        print("==============")
        return e


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def GetBooking(request, id):
    """Bir rezervasyonu getirir. id parametresi alır."""
    # if Receptionist.Security(request):
    #     return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    booking = get_object_or_404(Booking, id=id)
    data = BookingSerializer(booking, many=False)
    return Response({"data": data.data}, status=200)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def MyBookings(request):
    """Kullanıcının rezervasyonlarını döndürür."""
    bookings = Booking.objects.filter(user=request.user).order_by('-start')
    serializer = BookingSerializer(bookings, many=True)
    return Response({"data": serializer.data}, status=200)


def WebHook(request):
    event = None
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as err:
        # Invalid payload
        raise err
    except stripe.error.SignatureVerificationError as err:
        # Invalid signature
        raise err

    # Handle the event
    if event.type == 'payment_intent.succeeded':
        payment_intent = event.data.object
        print("--------payment_intent ---------->", payment_intent)
    elif event.type == 'payment_method.attached':
        payment_method = event.data.object
        print("--------payment_method ---------->", payment_method)
    # ... handle other event types
    else:
        print('Unhandled event type {}'.format(event.type))

    return JsonResponse(success=True, safe=False)
