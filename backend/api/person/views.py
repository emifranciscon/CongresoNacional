from django.shortcuts import render
from person.models import PersonEntity, FichaMedicaEntity, DiocesisEntity
from person.serializers import PersonEntitySerializer, FichaMedicaEntitySerializer, DiocesisEntitySerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class PersonViewSet(viewsets.ModelViewSet):
	serializer_class = PersonEntitySerializer
	queryset = PersonEntity.objects.all()
	lookup_field = 'id'

class FichaMedicaViewSet(viewsets.ModelViewSet):
	serializer_class = FichaMedicaEntitySerializer
	queryset = FichaMedicaEntity.objects.all()
	lookup_field = 'id'



@api_view(['GET'])
def lista_diocesis(request):
    diocesis = DiocesisEntity.objects.all()
    serializer = DiocesisEntitySerializer(diocesis, many=True)
    return Response(serializer.data)
