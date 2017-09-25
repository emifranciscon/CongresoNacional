from rest_framework import serializers
from person.models import FichaMedica, Diocesis, Person, Estado, Comision, Comidas


class ComisionStringField(serializers.RelatedField):
    def to_representation(self, value):
        return str(value)

class PersonSerializer(serializers.ModelSerializer):
	#diocesis = serializers.SlugRelatedField(many=False,queryset=Diocesis.objects.all() ,slug_field='nombre')
	diocesis = serializers.SlugRelatedField(many=False,read_only=True ,slug_field='nombre')
	#estado = serializers.SlugRelatedField(many=False,queryset=Estado.objects.all(), slug_field='nombre')
	estado = serializers.SlugRelatedField(many=False,read_only=True ,slug_field='nombre')
	detalle_dioc = ComisionStringField(many=False,read_only=True)
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

class ComisionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comision
		fields = '__all__'

class ComidasSerializer(serializers.ModelSerializer):
	class Meta:
		model = Comision
		fields = '__all__'
