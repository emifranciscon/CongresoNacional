from rest_framework import serializers
from person.models import FichaMedica, Diocesis, Person, Estado


class PersonSerializer(serializers.ModelSerializer):
	diocesis = serializers.SlugRelatedField(many=False,queryset=Diocesis.objects.all() ,slug_field='nombre')
	estado = serializers.SlugRelatedField(many=False,queryset=Estado.objects.all(), slug_field='nombre')
	medical_record = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
	fecha_registro = serializers.DateField(read_only=True)

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


class EstadoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Estado
		fields = '__all__'
