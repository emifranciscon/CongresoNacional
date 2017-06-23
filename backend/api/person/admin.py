from django.contrib import admin
from person.models import Person, Diocesis, Responsable, Responsable, FichaMedica, Estado


# Register your models here.


class PersonAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'apellido')

class DiocesisAdmin(admin.ModelAdmin):
	list_display = ('nombre','cupo')

class ResponsableAdmin(admin.ModelAdmin):
	list_display = ('nombre','apellido','diocesis')

class FichaMedicaAdmin(admin.ModelAdmin):
	list_display = ('id',)



class EstadoAdmin(admin.ModelAdmin):
	list_display = ('nombre',)


admin.site.register(Person, PersonAdmin)
admin.site.register(Diocesis, DiocesisAdmin)
admin.site.register(Responsable, ResponsableAdmin)
admin.site.register(FichaMedica, FichaMedicaAdmin)
admin.site.register(Estado, EstadoAdmin)
