# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2017-07-06 00:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0003_person_fecha_registro'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diocesis',
            name='cupo',
            field=models.PositiveIntegerField(),
        ),
    ]