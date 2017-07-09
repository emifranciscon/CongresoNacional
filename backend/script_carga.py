# -*- encoding: utf-8 -*-
#!/usr/bin/env python
#coding: utf8


#./manage.py shell < script_carga.py

print("Poblando Base de datos")

from person.models import Estado
estado4 = Estado(pk = 4, nombre = 'Eliminado', descripcion='descripcion')
estado4.save()
estado3 = Estado(pk = 3, nombre = 'Pagado', descripcion='descripcion')
estado3.save()
estado2 = Estado(pk = 2, nombre = 'Inscripto', descripcion='descripcion')
estado2.save()
estado1 = Estado(pk = 1, nombre = 'PreInscripto', descripcion='descripcion')
estado1.save()


from person.models import Diocesis

diocesis1 = Diocesis(pk = 1, nombre = 'Cafayate', cupo = 50)
diocesis1.save()
diocesis2 = Diocesis(pk = 2, nombre = 'Catamarca', cupo = 50)
diocesis2.save()
diocesis3 = Diocesis(pk = 3, nombre = 'Chilecito', cupo = 50)
diocesis3.save()
diocesis4 = Diocesis(pk = 4, nombre = 'Concepción de Tucumán', cupo = 50)
diocesis4.save()
diocesis5 = Diocesis(pk = 5, nombre = 'Formosa', cupo = 50)
diocesis5.save()
diocesis6 = Diocesis(pk = 6, nombre = 'Rio IV', cupo = 50)
diocesis6.save()
diocesis7 = Diocesis(pk = 7, nombre = 'San Francisco', cupo = 50)
diocesis7.save()
diocesis8 = Diocesis(pk = 8, nombre = 'San Juan', cupo = 50)
diocesis8.save()
diocesis9 = Diocesis(pk = 9, nombre = 'San Luis', cupo = 50)
diocesis9.save()
diocesis10 = Diocesis(pk = 10, nombre = 'Catamarca', cupo = 50)
diocesis10.save()
diocesis11 = Diocesis(pk = 11, nombre = 'Santiago del Estero', cupo = 50)
diocesis11.save()
diocesis12 = Diocesis(pk = 12, nombre = 'Tucumán', cupo = 50)
diocesis12.save()
diocesis13 = Diocesis(pk = 13, nombre = 'Villa Maria', cupo = 50)
diocesis13.save()
diocesis14 = Diocesis(pk = 14, nombre = 'Cruz del Eje', cupo = 50)
diocesis14.save()
diocesis15 = Diocesis(pk = 15, nombre = 'San Rafael', cupo = 50)
diocesis15.save()
diocesis16 = Diocesis(pk = 16, nombre = 'Rosario', cupo = 50)
diocesis16.save()
