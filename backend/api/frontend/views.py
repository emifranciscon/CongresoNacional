import json
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
# Create your views here.

@login_required(login_url = "/login/")
def home(request):
	template = 'home.html'
	###Validacion cupo
	resp = Responsable.objects.get(user=request.user.id)
	persons = Person.objects.filter(diocesis=resp.diocesis)
	registrados = persons.count()
	dioc = resp.diocesis
	cupo_total = dioc.cupo
	cupo_disponible = cupo_total - registrados
	isLimited = False
	if registrados >= cupo_total:
		isLimited = True

	print(isLimited)
	ctx = {'diocesis':dioc.nombre, 'persons':persons, 'cupo_total':cupo_total, 'cupo_disponible': cupo_disponible, 'isLimited':isLimited }
	return render_to_response(template,ctx)




@login_required(login_url = "/login/")
def inscripcion_aux(request):
	template = 'inscripcion_aux.html'
	es_diocesis_vm = False
	try:
		resp = Responsable.objects.get(user=request.user.id)
		dioc = resp.diocesis
		print(dioc)
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
