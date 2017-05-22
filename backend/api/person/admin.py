from django.contrib import admin
from person.models import PersonEntity

# Register your models here.


class PersonAdmin(admin.ModelAdmin):
	list_display = ('name', 'surname', 'doc_number')


admin.site.register(PersonEntity, PersonAdmin)
