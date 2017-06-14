from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from person.models import Person, FichaMedica, Diocesis
from person.serializers import PersonSerializer, FichaMedicaSerializer, DiocesisSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.db import transaction



# Create your views here.

class PersonViewSet(viewsets.ModelViewSet):
	serializer_class = PersonSerializer
	queryset = Person.objects.all()
	lookup_field = 'id'

class FichaMedicaViewSet(viewsets.ModelViewSet):
	serializer_class = FichaMedicaSerializer
	queryset = FichaMedica.objects.all()
	lookup_field = 'id'



@api_view(['GET'])
def lista_diocesis(request):
    diocesis = Diocesis.objects.all()
    serializer = DiocesisSerializer(diocesis, many=True)
    return Response(serializer.data)


@transaction.atomic
@api_view(['POST'])
def registered_person(request):
	data = JSONParser().parse(request)
	serializer_person = PersonSerializer(data=data["data_person"])
	serializer_medical = FichaMedicaSerializer(data=data["medical_record"])
	if not serializer_person.is_valid():
		return JsonResponse(serializer_person.errors, status=400)




	serializer_person.save()

	data["medical_record"]["id"] = serializer_person["id"]

	#sid = transaction.savepoint()

	serializer_medical.save()
	return JsonResponse({"id_person":serializer_person.data["id"],"id_medical":serializer_medical.data["id"]}, status=201)
