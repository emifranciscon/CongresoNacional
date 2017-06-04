from django.shortcuts import render
from django.shortcuts import render_to_response,get_object_or_404 , render

# Create your views here.

def home(request):
	template = 'index.html'
	return render(request,template)

def inscripcion(request):
	template = 'inscripcion.html'
	return render(request,template)
