from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Comidas(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return "{0}".format(self.nombre)


class Comision(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return "{0}".format(self.nombre)


class DetalleDiocesis(models.Model):
    TIPO_ASISTENCIA = (
        ('PARTICIPANTE', 'PARTICIPANTE'),
        ('SERVIDOR', 'SERVIDOR'),
    )
    tipo_asistencia = models.CharField(
        max_length=20, choices=TIPO_ASISTENCIA,
        default='PARTICIPANTE',
        null=True,
        blank=True
    )
    comision = models.ForeignKey(Comision, null=True, blank=True)
    descripcion = models.CharField(max_length=1000, null=True, blank=True)
    duerme_en_universidad = models.BooleanField(default=False)
    quiere_material = models.BooleanField(default=False)
    comidas = models.ManyToManyField(Comidas, blank=True)

    def __str__(self):
        return "id: {0} Tipo: {1}".format(self.pk, self.tipo_asistencia)


class Diocesis(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    cupo = models.PositiveIntegerField(unique=False, null=False, blank=False)

    def __str__(self):
        return "{0} - cupo: {1}".format(self.nombre, self.cupo)


class Estado(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return "{0}".format(self.nombre)


class Responsable(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    apellido = models.CharField(max_length=100, null=False, blank=False)
    user = models.OneToOneField(User, unique=True, null=True, blank=True)
    diocesis = models.ForeignKey(Diocesis)

    def __str__(self):
        return "{0},{1} - Diocesis: {2} - User: {3}".format(
            self.apellido,
            self.nombre,
            self.diocesis,
            self.user
        )


class FichaMedica(models.Model):
    """Enfermedades respiratorias"""
    broquitis_cronica = models.BooleanField(default=False)
    asma = models.BooleanField(default=False)
    enfisema = models.BooleanField(default=False)
    alergias = models.CharField(max_length=500, null=True, blank=True)
    otras_respiratorias = models.CharField(
        max_length=500, null=True, blank=True)

    """Enfermedades circulatorias"""
    hipertension = models.BooleanField(default=False)
    hipotension = models.BooleanField(default=False)
    infarto_cardiaco = models.BooleanField(default=False)
    disritmia_cardiaca = models.BooleanField(default=False)
    malformacion_corazon = models.BooleanField(default=False)
    otras_circulatorias = models.CharField(
        max_length=500, null=True, blank=True)

    """Enfermedades MUSCULOESQUELETALES"""
    dolor_ciatico = models.BooleanField(default=False)
    escoliosis = models.BooleanField(default=False)
    miastenia = models.BooleanField(default=False)
    otras_musculoesque = models.CharField(
        max_length=500, null=True, blank=True)

    """Enfermedades HORMONALES"""
    diabetes = models.BooleanField(default=False)
    hipertiroidismo = models.BooleanField(default=False)
    otras_hormonales = models.CharField(max_length=500, null=True, blank=True)

    """MEDICACIÓN ACTUAL / CRONICA"""
    medicacion_actual = models.BooleanField(default=False)
    comprimidos = models.CharField(max_length=500, null=True, blank=True)
    inyectables = models.CharField(max_length=500, null=True, blank=True)

    """ENFERMEDADES DEL SISTEMA NERVIOS"""
    dificultad_leer = models.BooleanField(default=False)
    vision_doble = models.BooleanField(default=False)
    dificultad_colores = models.BooleanField(default=False)
    dificultad_colores_desc = models.CharField(
        max_length=500, null=True, blank=True)
    dificultad_oir = models.BooleanField(default=False)
    epilepsia = models.BooleanField(default=False)
    derrame = models.BooleanField(default=False)
    derrame_desc = models.CharField(max_length=500, null=True, blank=True)
    jaquecas = models.BooleanField(default=False)
    otras_nerviosas = models.CharField(max_length=500, null=True, blank=True)

    """Sufre usted de?"""
    vertigo = models.BooleanField(default=False)
    claustrofobia = models.BooleanField(default=False)
    aragnofobia = models.BooleanField(default=False)
    otras_enfermedades = models.CharField(
        max_length=500, null=True, blank=True)
    fuma = models.BooleanField(default=False)
    nadar = models.BooleanField(default=False)
    peso = models.CharField(max_length=100, null=True, blank=True)
    altura = models.CharField(max_length=100, null=True, blank=True)
    grupo_sanguineo = models.CharField(max_length=50, null=True, blank=True)
    ser_att_medica = models.CharField(max_length=500, null=True, blank=True)
    medico_cabecera = models.CharField(max_length=500, null=True, blank=True)
    hospital_derivacion = models.CharField(
        max_length=500, null=True, blank=True)
    aclaracion = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return "{0}".format(self.pk)


class Person(models.Model):
    TALLES = (
        ('NO', 'NO'),
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
    )
    nombre = models.CharField(max_length=100, null=False, blank=False)
    apellido = models.CharField(max_length=100, null=False, blank=False)
    num_doc = models.PositiveIntegerField(unique=True, null=False, blank=False)
    email_personal = models.EmailField(max_length=254, null=False, blank=False)
    tel_emergencia = models.CharField(max_length=100, null=False, blank=False)
    tel_personal = models.CharField(max_length=100, null=False, blank=False)
    fecha_nacimiento = models.DateField(null=False, blank=False)
    talle = models.CharField(max_length=5, choices=TALLES,
                             default='NO', null=True, blank=True)
    descripcion_dieta = models.CharField(max_length=500, null=True, blank=True)
    descripcion_familia = models.CharField(
        max_length=500, null=True, blank=True)
    num_eslabon = models.PositiveIntegerField(null=False, blank=False)
    fecha_eslabon = models.DateField(null=False, blank=False)
    email_contacto = models.EmailField(max_length=254, null=False, blank=False)
    pago_remera = models.BooleanField(default=False)
    descripcion_familia = models.CharField(
        max_length=500, null=True, blank=True)
    descripcion_registro = models.CharField(
        max_length=500, null=True, blank=True)
    fecha_registro = models.DateField(auto_now_add=True)
    medical_record = models.OneToOneField(
        FichaMedica, unique=True, null=True, blank=True)
    diocesis = models.ForeignKey(Diocesis)
    estado = models.ForeignKey(Estado)
    detalle_dioc = models.ForeignKey(DetalleDiocesis, null=True, blank=True)

    def __str__(self):
        return "{0},{1} - Doc: {2}".format(
            self.apellido,
            self.nombre,
            self.num_doc
        )

    @property
    def fecha_nac(self):
        return str(self.fecha_nacimiento)
