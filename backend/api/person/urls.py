from django.conf.urls import patterns, url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from person.views import PersonViewSet
from person.views import FichaMedicaViewSet


router = DefaultRouter()
router.register(r'person', PersonViewSet)
router.register(r'medical', FichaMedicaViewSet)

urlpatterns = [
    url(r'^',include(router.urls)),
    url(r'^diocesis', 'person.views.lista_diocesis'),
    url(r'^register', 'person.views.registered_person'),
]
