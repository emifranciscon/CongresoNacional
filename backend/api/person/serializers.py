from rest_framework import serializers
from person.models import FichaMedicaEntity, DiocesisEntity, PersonEntity


class PersonEntitySerializer(serializers.ModelSerializer):
	class Meta:
		model = PersonEntity
		fields = '__all__'


class FichaMedicaEntitySerializer(serializers.ModelSerializer):
	class Meta:
		model = FichaMedicaEntity
		fields = '__all__'

class DiocesisEntitySerializer(serializers.ModelSerializer):
	class Meta:
		model = DiocesisEntity
		fields = '__all__'
