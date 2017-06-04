from django.contrib import admin
from person.models import PersonEntity
from person.models import DiocesisEntity
from person.models import ResponsableEntity
from person.models import FichaMedicaEntity


# Register your models here.


class PersonAdmin(admin.ModelAdmin):
	list_display = ('nombre', 'apellido')

class DiocesisAdmin(admin.ModelAdmin):
	list_display = ('nombre','cupo')

class ResponsableAdmin(admin.ModelAdmin):
	list_display = ('nombre','apellido','diocesis')

class FichaMedicaAdmin(admin.ModelAdmin):
	pass


admin.site.register(PersonEntity, PersonAdmin)
admin.site.register(DiocesisEntity, DiocesisAdmin)
admin.site.register(ResponsableEntity, ResponsableAdmin)
admin.site.register(FichaMedicaEntity, FichaMedicaAdmin)
