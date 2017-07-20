from django.contrib import admin
from person.models import Person, Diocesis, Responsable, Responsable, FichaMedica, Estado, Comision


# Register your models here.


class PersonAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'apellido','num_doc','medical_record')

class DiocesisAdmin(admin.ModelAdmin):
	list_display = ('nombre','cupo')

class ResponsableAdmin(admin.ModelAdmin):
	list_display = ('nombre','apellido','diocesis','user')

class FichaMedicaAdmin(admin.ModelAdmin):
	list_display = ('id','person')

	def person(self, obj):
		resp = Person.objects.get(medical_record=obj.id)
		return resp



class EstadoAdmin(admin.ModelAdmin):
	list_display = ('nombre',)

class ComisionAdmin(admin.ModelAdmin):
	list_display = ('nombre',)

admin.site.register(Person, PersonAdmin)
admin.site.register(Diocesis, DiocesisAdmin)
admin.site.register(Responsable, ResponsableAdmin)
admin.site.register(FichaMedica, FichaMedicaAdmin)
admin.site.register(Estado, EstadoAdmin)
admin.site.register(Comision, ComisionAdmin)
