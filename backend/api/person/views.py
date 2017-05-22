from django.shortcuts import render
from person.models import PersonEntity
from person.serializers import PersonEntitySerializer
from rest_framework import viewsets


# Create your views here.

class PersonViewSet(viewsets.ModelViewSet):
	serializer_class = PersonEntitySerializer
	queryset = PersonEntity.objects.all()
	lookup_field = 'id'
