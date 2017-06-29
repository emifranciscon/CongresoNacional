from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from person.models import Person, FichaMedica, Diocesis, Estado, Responsable
from person.filters import PersonFilter
from person.serializers import PersonSerializer, FichaMedicaSerializer, DiocesisSerializer, EstadoSerializer
from rest_framework import viewsets,filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from django.db import transaction



# Create your views here.

class PersonViewSet(viewsets.ModelViewSet):
	serializer_class = PersonSerializer
	queryset = Person.objects.all()
	lookup_field = 'id'
	filter_backend = (filters.DjangoFilterBackend,filters.OrderingFilter)
	filter_class = PersonFilter
	ordering_fields = ('apellido','nombre')

class FichaMedicaViewSet(viewsets.ModelViewSet):
	serializer_class = FichaMedicaSerializer
	queryset = FichaMedica.objects.all()
	lookup_field = 'id'



@api_view(['GET'])
def lista_diocesis(request):
    diocesis = Diocesis.objects.all()
    serializer = DiocesisSerializer(diocesis, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def lista_estados(request):
    estados = Estado.objects.all()
    serializer = EstadoSerializer(estados, many=True)
    return Response(serializer.data)

@transaction.atomic
@api_view(['POST'])
def registered_person(request):

	###Validacion cupo
	resp = Responsable.objects.get(user=request.user.id)
	count_registered = Person.objects.filter(diocesis=resp.diocesis).count()
	count_cupo = resp.diocesis.cupo
	print("count_registered: {0} - count_cupo: {1}".format(count_registered,count_cupo))

	if count_registered >= count_cupo:
		return JsonResponse({"msg": "llego al limite de cupo por diocesis"}, status=409)
	###Fin validacion cupo

	serializer_medical = FichaMedicaSerializer(data=request.data["medical_record"])

	if not serializer_medical.is_valid():
		return JsonResponse(serializer_medical.errors, status=400)

	serializer_person = PersonSerializer(data=request.data["data_person"])

	if not serializer_person.is_valid():
		return JsonResponse(serializer_person.errors, status=400)


	#Al momento de guardar en base seteamos la ficha medica y la diocesis
	serializer_person.save(medical_record=serializer_medical.save(),diocesis = resp.diocesis)

	return JsonResponse({"id_person":serializer_person.data["id"]}, status=201)
