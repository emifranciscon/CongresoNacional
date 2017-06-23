import django_filters
from person.models import Person

class PersonFilter(django_filters.FilterSet):
	apellido = django_filters.CharFilter(lookup_expr='iexact')

	class Meta:
		model = Person
		fields = ('diocesis','estado','apellido','num_doc',)
