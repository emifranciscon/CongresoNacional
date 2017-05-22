from django.db import models

# Create your models here.

class PersonEntity(models.Model):
    WAIST = (
        ('NO', 'NO'),
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
    )
    name = models.CharField(max_length = 100, null = False , blank = False)
    surname = models.CharField(max_length = 100, null = False , blank = False)
    doc_number = models.PositiveIntegerField(unique=True, null = False , blank = False)
    email_personal = models.EmailField(max_length = 254, null = False , blank = False)
    emergency_tel_number = models.CharField(max_length = 100, null = False , blank = False)
    personal_tel_number = models.CharField(max_length = 100, null = False , blank = False)
    date_birth = models.DateField(null = False , blank = False)
    waist = models.CharField(max_length=2, choices=WAIST, default='NO',null = False , blank = False)
    diet_description = models.CharField(max_length = 500, null = False , blank = False)
    diocesis = models.CharField(max_length = 250, null = False , blank = False)
    eslabon_number = models.PositiveIntegerField(null = False , blank = False)
    date_eslabon = models.DateField(null = False , blank = False)
    email_contact = models.EmailField(max_length = 254, null = False , blank = False)
    is_pay = models.BooleanField(default = False)
    is_acredited = models.BooleanField(default = False)
