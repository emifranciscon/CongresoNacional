from django.shortcuts import render
from django.shortcuts import render_to_response,get_object_or_404 , render
from django.contrib.auth import login, authenticate, logout
from django.template.context import RequestContext
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
import json
from .forms import *
from django.contrib.auth.views import *
# Create your views here.

def home(request):
	template = 'index.html'
	return render(request,template)



@login_required(login_url = "/login/")
def inscripcion(request):
	template = 'inscripcion.html'
	return render(request,template)

@login_required(login_url = "/login/")
def work_view(request):
	template = 'work_view.html'
	return render(request,template)



def login_view(request):
    template = "login.html"
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
        return render_to_response(template,ctx,context_instance= RequestContext(request))


@login_required(login_url = "/login/")
def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")
