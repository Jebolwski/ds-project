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
from .serializers import RoomSerializer, AddRoomSerializer, MessageSerializer, FeedbackSerializer, AdultSerializer, ChildSerializer, BookingSerializer, BookingAddSerializer
from .models import Room, RoomCategory, Booking, Message, Receptionist, Feedback
from .forms import SignupForm
import datetime
from django.shortcuts import redirect
import stripe
from django.conf import settings


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

    def print(self):
        for i in self.stack:
            print(" | " + str(i) + " | ")

    def peek(self):
        return self.stack[-1]


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
    """Kullanıcı kaydı yapar. email, username, password, password1 verilerini alır."""
    if request.data:
        mails = [i.email for i in User.objects.all()]
        if request.data.get('email') in mails:
            return Response({"msg_en": "This email already in use. 😢", "msg_tr": "Girdiğiniz email kullanımda. 😢"}, status=400)
        form = SignupForm(request.data)
        if form.is_valid():
            user = form.save()
            return Response({"msg_en": "Successfully registered. ✨", "msg_tr": "Başarıyla kayıt olundu. ✨"}, status=200)
        else:
            print(form.errors)
            return Response({"msg_en": "Data is not valid. 🤨", "msg_tr": "Veri doğru değil. 🤨"}, status=400)
    else:
        return Response({"msg_en": "There was no data entered. 😒", "msg_tr": "Bize veri verilmedi. 😒"}, status=400)


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


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def AddRoom(request):
    """
        Otele oda ekler. max_adult, max_children, image1,
        image2, image3, image4 verilerini alır.
    """
    if request.data.get('image1') == None and request.data.get('image2') == None and request.data.get('image3') == None and request.data.get('image4') == None:
        return Response({"msg_en": "You didnt enter any photos. 😶", "msg_tr": "Hiç fotoğraf girmediniz. 😶"}, status=400)
    data = request.data.copy()
    if data.get('category'):
        data['category'] = int(data.get('category'))
    print(data)
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


@api_view(['GET'])
@permission_classes([AllowAny])
def SearchRoom(request):
    """
        Rezervasyon yaptırır. start, end, children, adult parametrelerini alır.
    """
    if request.GET.get('start') == None:
        return Response({"msg_en": "You didnt enter start date. 😶", "msg_tr": "Giriş tarihini girmediniz. 😶"}, status=400)

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
    temp = odalar.head
    while temp != None:
        bookings = Booking.objects.filter(room=temp.value)
        if len(bookings) > 0:
            flag = True
            for j in bookings:
                dataStart = datetime.date(2023, 3, 30)
                dataEnd = datetime.date(2023, 4, 4)
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


@api_view(['POST'])
@permission_classes([AllowAny])
def SendMessage(request):
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
            'room'), "start": request.data.get('start'), "end": request.data.get('end')}
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


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def RemoveBooking(request, id):
    """
        Rezervasyon silinir id parametresi ve stay verisi alınır.
        Stay verisi verilirse kullanıcılar silinmez, verilmezse rezervasyon ve kullanıcılar silinir.    
    """

    if Receptionist.Security(request):
        return Response({"msg_en": "You are not allowed here. 🤨", "msg_tr": "Burada bulunamazsın. 🤨"}, status=400)

    booking = Booking.objects.filter(id=id)
    if len(booking) > 0:
        booking = booking[0]

        if request.data.get('stay'):
            booking.delete()
        else:
            for child in booking.childs.all():
                child.delete()
            for adult in booking.adults.all():
                adult.delete()
            booking.delete()
        return Response({"msg_en": "Sucessfully deleted booking. 🚀", "msg_tr": "Rezervasyon silindi. 🚀"}, status=200)
    else:
        return Response({"msg_en": "Couldnt find the booking. 😥", "msg_tr": "Rezervasyon bulunamadı. 😥"}, status=400)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([AllowAny])
def FeedbackRoom(request):
    """Geri dönüş yaptırır.Room, text, user*, food*, location*, service* verilerini alır."""
    if request.data.get('room') == None:
        return Response({"msg_en": "You didnt enter room. 🥲", "msg_tr": "Oda verisini eklemedin. 🥲"}, status=400)
    if request.data.get('text') == None:
        return Response({"msg_en": "You didnt enter text. 🥲", "msg_tr": "Metin verisini eklemedin. 🥲"}, status=400)

    data = request.data.copy()
    if request.user:
        data['user'] = request.user.id
    serializer = FeedbackSerializer(data=data)
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
@permission_classes([AllowAny])
def Payment(request):
    if request.data.get('price') == None:
        return Response({"msg_en": "Price wasnt entered. 😥", "msg_tr": "Fiyat girilmedi. 😥"}, status=400)
    if request.data.get('product_name') == None:
        return Response({"msg_en": "Product name wasnt entered. 😒", "msg_tr": "Ürün adı girilmedi. 😒"}, status=400)

    price = request.data.get('price')
    product_name = request.data.get('product_name')
    idn = 0
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
            success_url="http://127.0.0.1:5173/checkout/success",
            cancel_url="http://127.0.0.1:5173/checkout/failed",
        )
        print(checkout_session)
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

            data = {"childs": children.stack, "adults": adults.stack, "room": request.data.get('room'),
                    "start": request.data.get('start'), "end": request.data.get('end')}

            booking = BookingAddSerializer(data=data, many=False)
            if booking.is_valid():
                book = booking.save()
                idn = book.id
                return redirect(checkout_session.url, code=303)
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
