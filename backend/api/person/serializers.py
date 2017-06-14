from rest_framework import serializers
from person.models import FichaMedica, Diocesis, Person


class PersonSerializer(serializers.ModelSerializer):
	class Meta:
		model = Person
		fields = '__all__'


class FichaMedicaSerializer(serializers.ModelSerializer):
	class Meta:
		model = FichaMedica
		fields = '__all__'

class DiocesisSerializer(serializers.ModelSerializer):
	class Meta:
		model = Diocesis
		fields = '__all__'
