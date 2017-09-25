from django.conf.urls import patterns, url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from person.views import PersonViewSet
from . import views

router = DefaultRouter()
router.register(r'person', PersonViewSet)

urlpatterns = [
    url(r'^',include(router.urls)),
    url(r'^comidas', views.lista_comidas),
    url(r'^comisiones', views.lista_comisiones),
    url(r'^diocesis', views.lista_diocesis),
    url(r'^estados', views.lista_estados),
    url(r'^register', views.registered_person),
    url(r'^update', views.update_persons),
    url(r'^pago_update', views.update_pago),

]
