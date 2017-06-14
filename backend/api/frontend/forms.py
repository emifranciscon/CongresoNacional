#!/usr/bin/env python
#coding: utf8

from django import forms
from django.forms import ModelForm, Textarea,DateInput, TextInput,Select,FileInput,NumberInput,PasswordInput
from django.contrib.auth.forms import *
from django.contrib.auth.views import *





class LoginForm(forms.Form):
    username = forms.CharField(widget = forms.TextInput(), label='')
    password = forms.CharField(widget = forms.PasswordInput(render_value = False), label = '')
    username.widget.attrs.update({'placeholder' : 'Usuario', 'type':'text' , 'class':'form-control',})
    password.widget.attrs.update({'placeholder' : 'Contraseña', 'type':'password', 'class':'form-control'})
