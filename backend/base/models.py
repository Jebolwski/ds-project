from django.db import models
from django.contrib.auth.models import User


class Child(models.Model):
    """Çocuk modeli name, age, tcno verilerini içerir."""
    name = models.CharField(null=False, blank=False, max_length=50)
    tcno = models.CharField(null=False, blank=False, max_length=11)
    age = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return self.name


class Adult(models.Model):
    """Yetişkin modeli name, tcno verilerini içerir."""
    name = models.CharField(null=False, blank=False, max_length=50)
    tcno = models.CharField(null=False, blank=False, max_length=11)

    def __str__(self):
        return self.name


class RoomCategory(models.Model):
    """Oda kategorisi modeli name, max_adult, max_children, desc verilerini içerir."""
    name = models.CharField(max_length=100, null=False, blank=True)
    max_adult = models.IntegerField(null=False, blank=False)
    max_children = models.IntegerField(null=False, blank=False)
    desc = models.TextField(max_length=400, null=False, blank=True)
    price = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return self.name+" | "+str(self.price)+"tl"


class Room(models.Model):
    """Oda modeli category, image1, image2, image3, image4 verilerini içerir."""
    category = models.ForeignKey(
        RoomCategory, on_delete=models.CASCADE, null=False, blank=False)
    image1 = models.ImageField(upload_to='room_images', null=True, blank=True)
    image2 = models.ImageField(upload_to='room_images', null=True, blank=True)
    image3 = models.ImageField(upload_to='room_images', null=True, blank=True)
    image4 = models.ImageField(upload_to='room_images', null=True, blank=True)

    def __str__(self):

        return self.category.name + " | " + str(self.id)


class Booking(models.Model):
    """Rezervasyon modeli room, children_count, adult_count, start, end verilerini içerir."""
    user = models.ForeignKey(
        User, blank=False, on_delete=models.CASCADE, null=False)
    room = models.ForeignKey(
        Room, on_delete=models.CASCADE, null=False, blank=False)
    childs = models.ManyToManyField(Child, blank=True)
    adults = models.ManyToManyField(Adult, blank=True)
    start = models.DateField(blank=False, null=False)
    end = models.DateField(blank=False, null=False)

    def __str__(self):
        return self.user.username+" --> "+str(self.room) + " --> " + self.start.strftime("%m/%d/%Y")+" -- "+self.end.strftime("%m/%d/%Y")


class Message(models.Model):
    """Mesaj modeli message, mail, name, number verilerini içerir."""
    message = models.TextField(null=False, blank=False, max_length=150)
    mail = models.CharField(null=True, blank=True, max_length=100)
    name = models.CharField(null=False, blank=False, max_length=70)
    number = models.CharField(max_length=12, null=False, blank=False)

    def __str__(self):
        return self.name + " | " + self.message[:40]+"..."


class Receptionist(models.Model):
    """Resepsiyonist modeli user verilerini içerir."""
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.user.username

    @staticmethod
    def Security(request):
        exists = True
        if request.user.is_superuser or len(Receptionist.objects.filter(user=request.user)) >= 1:
            exists = False
        return exists


RATE = [
    ("0", 0),
    ("1", 1),
    ("2", 2),
    ("3", 3),
    ("4", 4),
    ("5", 5),
    ("6", 6),
    ("7", 7),
    ("8", 8),
    ("9", 9),
    ("10", 10),
]


class Feedback(models.Model):
    """Resepsiyonist modeli room, user, text, food, room, service, location verilerini içerir."""
    room = models.ManyToOneRel(Room, to="self", field_name="Room")
    user = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.SET_NULL)
    text = models.CharField(max_length=240, null=False, blank=False)
    food = models.CharField(max_length=2, choices=RATE, default="6")
    room = models.CharField(max_length=2, choices=RATE, default="6")
    service = models.CharField(max_length=2, choices=RATE, default="6")
    location = models.CharField(max_length=2, choices=RATE, default="6")

    def __str__(self):
        if self.user:
            return self.user.username + " | " + self.text
        return self.text
