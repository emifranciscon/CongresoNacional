from django.contrib import admin
from person.models import Person
from person.models import Diocesis
from person.models import Responsable
from person.models import FichaMedica


# Register your models here.


class PersonAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'apellido')

class DiocesisAdmin(admin.ModelAdmin):
	list_display = ('nombre','cupo')

class ResponsableAdmin(admin.ModelAdmin):
	list_display = ('nombre','apellido','diocesis')

class FichaMedicaAdmin(admin.ModelAdmin):
	pass


admin.site.register(Person, PersonAdmin)
admin.site.register(Diocesis, DiocesisAdmin)
admin.site.register(Responsable, ResponsableAdmin)
admin.site.register(FichaMedica, FichaMedicaAdmin)
