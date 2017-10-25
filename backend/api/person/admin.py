from django.contrib import admin
from person.models import Person, Diocesis, Responsable, FichaMedica, Estado, Comision, Comidas, DetalleDiocesis


# Register your models here.


class PersonAdmin(admin.ModelAdmin):
    list_display = ('pk', 'nombre', 'apellido', 'num_doc', 'medical_record', 'detalle_dioc')
    search_fields = ['apellido', 'num_doc']


class DiocesisAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'cupo')


class ResponsableAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'diocesis', 'user')


class FichaMedicaAdmin(admin.ModelAdmin):
    list_display = ('id', 'person')

    def person(self, obj):
        resp = Person.objects.get(medical_record=obj.id)
        return resp


class EstadoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'nombre',)


class ComisionAdmin(admin.ModelAdmin):
    list_display = ('nombre',)


class ComidasAdmin(admin.ModelAdmin):
    list_display = ('nombre',)


class DetalleDiocesisAdmin(admin.ModelAdmin):
    list_display = ('pk', 'tipo_asistencia', 'comision', 'descripcion',
                    'duerme_en_universidad', 'quiere_material', 'list_comidas')

    def list_comidas(self, obj):
        resp = '<ul>'
        for comida in obj.comidas.all():
            resp = resp + '<li>' + str(comida) + '</li>'
        return resp + '</ul>'

    list_comidas.allow_tags = True


admin.site.register(DetalleDiocesis, DetalleDiocesisAdmin)
admin.site.register(Comidas, ComidasAdmin)
admin.site.register(Person, PersonAdmin)
admin.site.register(Diocesis, DiocesisAdmin)
admin.site.register(Responsable, ResponsableAdmin)
admin.site.register(FichaMedica, FichaMedicaAdmin)
admin.site.register(Estado, EstadoAdmin)
admin.site.register(Comision, ComisionAdmin)
