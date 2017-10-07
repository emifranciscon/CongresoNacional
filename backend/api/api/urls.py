"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import patterns, url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from person.views import PersonViewSet
from django.views.generic.base import RedirectView
from frontend import views



urlpatterns = [
    url(r'^inicio/', views.home, name='home_view'),
    url(r'^inscripcion/', views.inscripcion_aux, name='inscripcion_view'),
    url(r'^work/', views.work_view),
    url(r'^report/', views.html_to_pdf_view, name='report_view'),
    url(r'^report_xls/', views.export_users_xls, name='report_view_xls'),
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', views.login_view, name='login_view'),
    url(r'^logout/$', views.logout_view, name='logaut_view'),
    url(r'^api/',include('person.urls')),
    url(r'', RedirectView.as_view(url='/inicio/')),
]
