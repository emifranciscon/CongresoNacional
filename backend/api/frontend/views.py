import xlwt
from django.conf import settings
from django.shortcuts import render, render_to_response
from django.template.context import RequestContext
from django.shortcuts import render_to_response,get_object_or_404 , render
from django.contrib.auth import login, authenticate, logout
from django.template.context import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from .forms import *
from django.contrib.auth.views import *
from person.models import Responsable, Person
from django.core.files.storage import FileSystemStorage
from django.template.loader import render_to_string
from weasyprint import HTML
from django.db.models import Count
from person.models import Person, Diocesis, Comidas, DetalleDiocesis
# Create your views here.
import datetime

@login_required(login_url = "/login/")
def home(request):
	template = 'home.html'
	###Validacion cupo
	resp = Responsable.objects.get(user=request.user.id)
	es_diocesis_vm = False
	if resp.diocesis.id == 13 or resp.diocesis.nombre == 'Villa Maria':
		persons = Person.objects.filter(diocesis=resp.diocesis, detalle_dioc__tipo_asistencia='PARTICIPANTE')
		es_diocesis_vm = True
	else:
		persons = Person.objects.filter(diocesis=resp.diocesis)
	registrados = persons.count()
	dioc = resp.diocesis
	cupo_total = dioc.cupo
	cupo_disponible = cupo_total - registrados
	isLimited = False
	if registrados >= cupo_total:
		isLimited = True

	ctx = {'diocesis':dioc.nombre, 'persons':persons, 'cupo_total':cupo_total, 'cupo_disponible': cupo_disponible, 'isLimited':isLimited, 'es_diocesis_vm':es_diocesis_vm }
	return render_to_response(template,ctx)




@login_required(login_url = "/login/")
def inscripcion_aux(request):
	template = 'inscripcion_aux.html'
	es_diocesis_vm = False
	try:
		resp = Responsable.objects.get(user=request.user.id)
		dioc = resp.diocesis
		if dioc.id == 13 or dioc.nombre == 'Villa Maria':
			es_diocesis_vm = True
	except Exception as e:
		print(e)

	ctx = {'es_diocesis_vm':es_diocesis_vm}
	return render_to_response(template,ctx,
        context_instance = RequestContext(request)
    )

@login_required(login_url = "/login/")
def work_view(request):
	if str(request.user) not in settings.ADMINS_USERS:
		return HttpResponseRedirect("/inicio/")

	template = 'work_view.html'
	return render(request,template)



def login_view(request):
    template = "login.html"
    print("path:{0}".format(request.path))
    mensaje = ""
    if request.user.is_authenticated():
        return HttpResponseRedirect("/")

    else:
        if request.method == "POST":
            form = LoginForm(request.POST)
            if form.is_valid():
                username = form.cleaned_data['username']
                password = form.cleaned_data['password']
                usuario = authenticate(username = username , password = password)
                if usuario is not None and usuario.is_active:
                    login(request, usuario)
                    return HttpResponseRedirect("/")
                else:
                    mensaje = "Usuario y/o contraseña incorrecto"
            else:
               mensaje = "Usuario y/o contraseña incorrecto"
        form = LoginForm()
        ctx = {'form':form, 'mensaje': mensaje}
        return render_to_response(template,ctx,context_instance = RequestContext(request))


@login_required(login_url = "/login/")
def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")




def html_to_pdf_view(request):
	if str(request.user) not in settings.ADMINS_USERS:
		return HttpResponseRedirect("/inicio/")
	query = Person.objects.values('diocesis__nombre').annotate(dcount=Count('diocesis'))
	html_string = render_to_string('pdf/report.html', {'diocesis': query})
	html = HTML(string=html_string)
	html.write_pdf(target='/tmp/report.pdf')
	fs = FileSystemStorage('/tmp')
	with fs.open('report.pdf') as pdf:
		response = HttpResponse(pdf, content_type='application/pdf')
		response['Content-Disposition'] = 'attachment; filename="report.pdf"'
		return response

	return response


def export_users_xls(request):
	if str(request.user) not in settings.ADMINS_USERS:
		return HttpResponseRedirect("/inicio/")

	wb = xlwt.Workbook(encoding='utf-8')
	ws = wb.add_sheet("Total")
	row_num = 0
	font_style = xlwt.XFStyle()
	font_style.font.bold = True
	columns = ['Diocesis', "Cantidad inscriptos"]
	for col_num in range(len(columns)):
		ws.write(row_num, col_num, columns[col_num], font_style)

	rows = Person.objects.values('diocesis__nombre').annotate(dcount=Count('diocesis')).values_list('diocesis__nombre','dcount')
	for row in rows:
		row_num += 1
		for col_num in range(len(row)):
			ws.write(row_num, col_num, row[col_num], font_style)


	ws = wb.add_sheet("Seguro")
	row_num = 0

	columns = ['Diocesis','Nombre', "Apellido", 'Documento', 'Fecha Nacimiento']
	for col_num in range(len(columns)):
		ws.write(row_num, col_num, columns[col_num], font_style)

	for diocesis in Diocesis.objects.all():
		rows = Person.objects.filter(diocesis=Diocesis.objects.get(pk=diocesis.pk)).values_list('diocesis__nombre','nombre','apellido','num_doc',datetime.datetime.today())

		for row in rows:
			row_num += 1
			for col_num in range(len(row)):
				ws.write(row_num, col_num, row[col_num], font_style)

	for diocesis in Diocesis.objects.all():
		if diocesis.nombre == 'Villa Maria':
			persons = Person.objects.filter(diocesis=Diocesis.objects.get(pk=diocesis.pk))
			comidas = []
			response = []
			for person in persons:
				det = DetalleDiocesis.objects.get(pk=person.detalle_dioc.pk)
				resp = ''
				for comida in det.comidas.all():
					resp = resp + ',' + str(comida) + ','

				tup1 = (det.pk, resp);
				response.append(tup1)


			ws = wb.add_sheet("detalle_dioc")
			row_num = 0

			font_style = xlwt.XFStyle()
			font_style.font.bold = True
			columns = ['id','comidas']
			for col_num in range(len(columns)):
				ws.write(row_num, col_num, columns[col_num], font_style)

			for row in response:
				row_num += 1
				for col_num in range(len(row)):
					ws.write(row_num, col_num, row[col_num], font_style)

			rows = persons.values_list('nombre','apellido','email_personal','talle','pago_remera','estado__nombre','descripcion_familia','descripcion_registro','detalle_dioc__tipo_asistencia','detalle_dioc__comision__nombre','detalle_dioc__descripcion', 'detalle_dioc__duerme_en_universidad', 'detalle_dioc__quiere_material','detalle_dioc__pk')
			columns = ['Nombre', 'Apellido', 'Email', 'Talle Remera', "Pago Remera", "Estado", "Descripcion Flia", "Observaciones", "Tipo asistencia", "comision", "Descripcion diocesis villa maria",'duerme en uni?', 'quiere material?', 'id_detalle']

		else:
			rows = Person.objects.filter(diocesis=Diocesis.objects.get(pk=diocesis.pk)).values_list('nombre','apellido','email_personal','talle','pago_remera','estado__nombre','descripcion_familia')
			columns = ['Nombre', 'Apellido', 'Email', 'Talle Remera', "Pago Remera", "Estado", "Descripcion Flia", "Observaciones"]

		if not rows:
			continue
		ws = wb.add_sheet(diocesis.nombre)
		row_num = 0

		font_style = xlwt.XFStyle()
		font_style.font.bold = True

		for col_num in range(len(columns)):
			ws.write(row_num, col_num, columns[col_num], font_style)

		for row in rows:
			row_num += 1
			for col_num in range(len(row)):
				ws.write(row_num, col_num, row[col_num], font_style)

	response = HttpResponse(content_type='application/ms-excel')
	response['Content-Disposition'] = 'attachment; filename="report.xls"'
	wb.save(response)
	return response
