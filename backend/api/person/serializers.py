from rest_framework import serializers
from person.models import PersonEntity


class PersonEntitySerializer(serializers.ModelSerializer):
	class Meta:
		model = PersonEntity
		fields = '__all__'
		#fields = ('id', 'nombre', 'descripcion', 'tipo_plato','tipo_categoria','precio','foto')
