var si = new Array(24)
var no = new Array(24)
$.validator.setDefaults({
  submitHandler: function(form) {
    if (form.id == "formDatosPers") {
      document.getElementById('ventana1').style.display = 'none';
      document.getElementById('ventana2').style.display = 'block';
      document.getElementById('ventana3').style.display = 'none';
      document.getElementById('btn-datosPers').setAttribute("class", "btn-info");
      document.getElementById('btn-datosMov').setAttribute("class", "btn-primary");
      document.getElementById('btn-datosMed').setAttribute("class", "btn-info");
    };
    if (form.id == "formDatosMov") {
      document.getElementById('ventana1').style.display = 'none';
      document.getElementById('ventana2').style.display = 'none';
      document.getElementById('ventana3').style.display = 'block';
      document.getElementById('btn-datosPers').setAttribute("class", "btn-info");
      document.getElementById('btn-datosMov').setAttribute("class", "btn-info");
      document.getElementById('btn-datosMed').setAttribute("class", "btn-primary");
    };
    if (form.id == "formDatosMedicos") {
      var nombre = document.getElementById('nombre').value
      var apellido = document.getElementById('apellido').value
      var documento = document.getElementById('documento').value
      var mail = document.getElementById('mail').value
      var mail2 = document.getElementById('mail2').value
      var fecha = document.getElementById('fecha').value
      var telefonoPersonal = document.getElementById('telefonoPersonal').value
      var telefonoEmergencia = document.getElementById('telefonoEmergencia').value
      var dieta = document.getElementById('dieta').value
      var GFamiliar = document.getElementById('GFamiliar').value
      var talle = document.getElementById('talle').value
      var fechaEslabon = document.getElementById('fechaEslabon').value
      var eslabon = document.getElementById('eslabon').value
      var diocesis = document.getElementById('diocesis').value

      for (var i = 1; i < 26; i++) {
        si[i] = document.getElementById('si' + i).checked
        no[i] = document.getElementById('no' + i).checked
        if (si[i] == no[i]) {
          $("#ventanaError").modal()
          break
        }
      };
      var asma = si[1]
      var enfisema = si[2]
      var broquitis_cronica = si[3]
      var hipertension = si[4]
      var hipotension = si[5]
      var disritmia_cardiaca = si[6]
      var dolor_ciatico = si[7]
      var escoliosis = si[8]
      var miastenia = si[9]
      var diabetes = si[10]
      var hipertiroidismo = si[11]
      var dificultad_colores = si[12]
      var vision_doble = si[13]
      var dificultad_oir = si[14]
      var epilepsia = si[15]
      var jaquecas = si[16]
      var claustrofobia = si[17]
      var aragnofobia = si[18]
      var vertigo = si[19]
      var infarto_cardiaco = si[20]
      var derrame = si[21]
      var fuma = si[22]
      var dificultad_leer = si[23]
      var malformacion_corazon = si[24]
      var medicacion_actual = si[25]
      var comprimidos = document.getElementById('comprimidos').value
      var inyectables = document.getElementById('inyectables').value
      var peso = document.getElementById('peso').value
      var altura = document.getElementById('altura').value
      var grupo_sanguineo = document.getElementById('grupo_sanguineo').value
      var ser_att_medica = document.getElementById('ser_att_medica').value
      var medico_cabecera = document.getElementById('medico_cabecera').value
      var hospital_derivacion = document.getElementById('hospital_derivacion').value
      var aclaracion = document.getElementById('aclaracion').value
      var alergias = document.getElementById('alergias').value
      var otras_respiratorias = document.getElementById('otras_respiratorias').value
      var otras_circulatorias = document.getElementById('otras_circulatorias').value
      var otras_musculoesque = document.getElementById('otras_musculoesque').value
      var otras_hormonales = document.getElementById('otras_hormonales').value
      var otras_nerviosas = document.getElementById('otras_nerviosas').value

      var bodyJson = {
        "data_person": {
          "nombre": nombre,
          "apellido": apellido,
          "num_doc": parseInt(documento),
          "email_personal": mail,
          "tel_emergencia": telefonoEmergencia,
          "tel_personal": telefonoPersonal,
          "fecha_nacimiento": fecha,
          "talle": talle,
          "descripcion_dieta": dieta,
          "num_eslabon": parseInt(eslabon),
          "fecha_eslabon": fechaEslabon,
          "email_contacto": mail2,
          "pago_remera": false,
          "descripcion_familia": GFamiliar,
          "descripcion_registro": "",
          //"diocesis": diocesis,
          "estado": "PreInscripto"
        },
        "medical_record": {
          "asma": asma,
          "enfisema": enfisema,
          "broquitis_cronica": broquitis_cronica,
          "alergias": alergias,
          "otras_respiratorias": otras_respiratorias,
          "hipertension": hipertension,
          "hipotension": hipotension,
          "infarto_cardiaco": infarto_cardiaco,
          "disritmia_cardiaca": disritmia_cardiaca,
          "malformacion_corazon": malformacion_corazon,
          "otras_circulatorias": otras_circulatorias,
          "dolor_ciatico": dolor_ciatico,
          "escoliosis": escoliosis,
          "miastenia": miastenia,
          "otras_musculoesque": otras_musculoesque,
          "diabetes": diabetes,
          "hipertiroidismo": hipertiroidismo,
          "otras_hormonales": otras_hormonales,
          "medicacion_actual": medicacion_actual,
          "comprimidos": comprimidos,
          "inyectables": inyectables,
          "dificultad_leer": dificultad_leer,
          "vision_doble": vision_doble,
          "dificultad_colores": dificultad_colores,
          "dificultad_colores_desc": "",
          "dificultad_oir": dificultad_oir,
          "epilepsia": epilepsia,
          "derrame": derrame,
          "derrame_desc": "",
          "jaquecas": jaquecas,
          "otras_nerviosas": otras_nerviosas,
          "vertigo": vertigo,
          "claustrofobia": claustrofobia,
          "aragnofobia": aragnofobia,
          "otras_enfermedades": "",
          "fuma": fuma,
          "nadar": false,
          "peso": peso,
          "altura": altura,
          "grupo_sanguineo": grupo_sanguineo,
          "ser_att_medica": ser_att_medica,
          "medico_cabecera": medico_cabecera,
          "hospital_derivacion": hospital_derivacion,
          "aclaracion": aclaracion
        }
      }
      var url = "/api/register";
      console.log(JSON.stringify(bodyJson))
      $.ajax({

        data: JSON.stringify(bodyJson), //datos que se envian a traves de ajax
        url: url, //archivo que recibe la peticion
        type: 'POST', //método de envio
        success: function(response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
          console.log(response)
        },
        error: function(response) {
          console.log(response)
        },
        contentType: 'application/json',
        dataType: 'json'
      });
    };
  }
});
jQuery.validator.addMethod("notEqual", function(value, element, param) {
  return this.optional(element) || value != param;
}, "Please specify a different (non-default) value");
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z+ñ\s]+$/i.test(value);
}, "Letters only please");

$(document).ready(function() {
	console.log(es_diocesis_vm)
  $('[data-toggle="tooltip"]').tooltip();   
  $('#test-btn').click(function() {
    var bodyJson = {
      "data_person": {
        "nombre": "Emiliano",
        "apellido": "Martin",
        "num_doc": 681341342,
        "email_personal": "emimartin26@hotmail.com",
        "tel_emergencia": "123123123123",
        "tel_personal": "123123123123",
        "fecha_nacimiento": "1919-10-10",
        "talle": "S",
        "descripcion_dieta": "asdasd",
        "num_eslabon": 2,
        "fecha_eslabon": "1919-10-10",
        "email_contacto": "emimartin26@hotmail.com",
        "pago_remera": false,
        "descripcion_familia": "asdasd",
        "descripcion_registro": "",
        //"diocesis": "Villa Maria",
        "estado": "PreInscripto"
      },
      "medical_record": {
        "asma": true,
        "enfisema": true,
        "broquitis_cronica": true,
        "alergias": "",
        "otras_respiratorias": "",
        "hipertension": true,
        "hipotension": true,
        "infarto_cardiaco": true,
        "disritmia_cardiaca": true,
        "malformacion_corazon": true,
        "otras_circulatorias": "",
        "dolor_ciatico": true,
        "escoliosis": true,
        "miastenia": true,
        "otras_musculoesque": "",
        "diabetes": true,
        "hipertiroidismo": true,
        "otras_hormonales": "",
        "medicacion_actual": true,
        "comprimidos": "",
        "inyectables": "",
        "dificultad_leer": true,
        "vision_doble": true,
        "dificultad_colores": true,
        "dificultad_colores_desc": "",
        "dificultad_oir": true,
        "epilepsia": true,
        "derrame": true,
        "derrame_desc": "",
        "jaquecas": true,
        "otras_nerviosas": "",
        "vertigo": true,
        "claustrofobia": true,
        "aragnofobia": true,
        "otras_enfermedades": "",
        "fuma": true,
        "nadar": false,
        "peso": "",
        "altura": "",
        "grupo_sanguineo": "",
        "ser_att_medica": "",
        "medico_cabecera": "",
        "hospital_derivacion": "",
        "aclaracion": ""
      }
    }
    var url = "/api/register";
    console.log(JSON.stringify(bodyJson))
    $.ajax({

      data: JSON.stringify(bodyJson), //datos que se envian a traves de ajax
      url: url, //archivo que recibe la peticion
      type: 'POST', //método de envio
      success: function(data, textStatus, jqXHR) { //una vez que el archivo recibe el request lo procesa y lo devuelve
        console.log(data)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("status: %d -- msg: %s",jqXHR.status,jqXHR.responseText)
        if (jqXHR.status=500) {
          $("#ventanaError500").modal()
        };
        
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  })

  $("#formDatosPers").validate({
    rules: {
      nombre: {
        required: true,
        lettersonly: true,
        maxlength: 100
      },
      apellido: {
        required: true,
        lettersonly: true,
        maxlength: 100
      },
      telefonoEmergencia: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 100
      },
      telefonoPersonal: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 100
      },
      documento: {
        required: true,
        digits: true,
        minlength: 8
      },
      mail: {
        required: true,
        email: true,
        maxlength: 254
      },
      mail2: {
        required: true,
        email: true,
        maxlength: 100
      },
      fecha: {
        required: true
      }
    },
    messages: {
      nombre: {
        required: "Por favor, ingrese su nombre.",
        lettersonly: "Por favor, ingrese solo letras sin asento.",
        maxlength: "A alcanzado el maximo de caracteres"
      },
      apellido: {
        required: "Por favor, ingrese su apellido.",
        lettersonly: "Por favor, ingrese solo letras sin asento.",
        maxlength: "A alcanzado el maximo de caracteres"
      },
      telefonoEmergencia: {
        required: "Por favor, ingrese un telefono de emercencia.",
        digits: "Por favor, ingrese solo digitos.",
        minlength: "Su dni contiene 12 digitos",
        maxlength: "A alcanzado el maximo de caracteres"
      },
      telefonoPersonal: {
        required: "Por favor, ingrese su telefono Personal.",
        digits: "Por favor, ingrese solo digitos.",
        minlength: "Su dni contiene 12 digitos"
      },
      documento: {
        required: "Por favor, ingrese su DNI.",
        digits: "Por favor, ingrese solo digitos.",
        minlength: "Su dni contiene 8 digitos"
      },
      mail: {
        required: "Por favor, ingrese su email.",
        email:"Por favor, ingrese su email correctamente.",
        maxlength: "A alcanzado el maximo de caracteres"
      },
      mail2: {
        required: "Por favor, ingrese el email de emercencia.",
        email:"Por favor, ingrese su email correctamente.",
        maxlength: "A alcanzado el maximo de caracteres"
      },
      fecha: "Por favor, ingrese fecha"
    },
    errorElement: "em",
    errorPlacement: function(error, element) {
      // Add the `help-block` class to the error element
      error.addClass("help-block");

      // Add `has-feedback` class to the parent div.form-group
      // in order to add icons to inputs
      element.parents(".col-sm-5").addClass("has-feedback");

      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
      } else {
        error.insertAfter(element);
      }

      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!element.next("span")[0]) {
        $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
      }
    },
    success: function(label, element) {
      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!$(element).next("span")[0]) {
        $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
      }

    },
    highlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
      $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
      $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
    }
  });
  $("#formDatosMov").validate({
    rules: {
      eslabon: {
        required: true,
        digits: true
      },
      diocesis: {
        required: true,
        lettersonly: true
      },
      encargado: {
        required: true
      },
      fechaEslabon: {
        required: true
      },
      añoEsl: {
        required: true,
        digits: true,
        maxlength: 4
      },
      talle: {
        required: true
      }

    },
    messages: {
      eslabon: {
        required: "Por favor, ingrese su Nº de eslabon.",
        digits: "Por favor, ingrese solo numeros."
      },
      diocesis: {
        required: "Por favor, ingrese su diocesis.",
        lettersonly: "Por favor, ingrese solo letras sin asento."
      },
      encargado: {
        required: "Por favor, seleccione una persona."
      },
      fechaEslabon: "Por favor, ingrese fecha",
      añoEsl: {
        required: "Por favor, ingrese el año que hizo el eslabon.",
        digits: "Por favor, ingrese solo digitos.",
        maxlength: "El año no contiene mas de 4 digitos"
      },
      talle: {
        required: "Por favor, seleccione un talle"
      }
    },
    errorElement: "em",
    errorPlacement: function(error, element) {
      // Add the `help-block` class to the error element
      error.addClass("help-block");

      // Add `has-feedback` class to the parent div.form-group
      // in order to add icons to inputs
      element.parents(".col-sm-5").addClass("has-feedback");

      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
      } else {
        error.insertAfter(element);
      }

      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!element.next("span")[0]) {
        $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
      }
    },
    success: function(label, element) {
      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!$(element).next("span")[0]) {
        $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
      }

    },
    highlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
      $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
      $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
    }
  });
  $("#formDatosMedicos").validate({
    rules: {
      diocesis: {
        required: true,
        lettersonly: true
      }
    },
    messages: {
      diocesis: {
        required: "Por favor, ingrese su diocesis.",
        lettersonly: "Por favor, ingrese solo letras sin asento."
      }
    },
    errorElement: "em",
    errorPlacement: function(error, element) {
      // Add the `help-block` class to the error element
      error.addClass("help-block");

      // Add `has-feedback` class to the parent div.form-group
      // in order to add icons to inputs
      element.parents(".col-sm-5").addClass("has-feedback");

      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("label"));
      } else {
        error.insertAfter(element);
      }

      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!element.next("span")[0]) {
        $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
      }
    },
    success: function(label, element) {
      // Add the span element, if doesn't exists, and apply the icon classes to it.
      if (!$(element).next("span")[0]) {
        $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
      }

    },
    highlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
      $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
      $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
    }
  });

});
function atrasVentana(numPestaña) {
  switch (numPestaña) {
    case 1:
      document.getElementById('ventana1').style.display = 'block';
      document.getElementById('ventana2').style.display = 'none';
      document.getElementById('ventana2').style.display = 'none';
      document.getElementById('btn-datosPers').setAttribute("class", "btn-primary");
      document.getElementById('btn-datosMov').setAttribute("class", "btn-info");
      document.getElementById('btn-datosMed').setAttribute("class", "btn-info");
      break;
    case 2:
      document.getElementById('ventana1').style.display = 'none';
      document.getElementById('ventana2').style.display = 'block';
      document.getElementById('ventana3').style.display = 'none';
      document.getElementById('btn-datosPers').setAttribute("class", "btn-info");
      document.getElementById('btn-datosMov').setAttribute("class", "btn-primary");
      document.getElementById('btn-datosMed').setAttribute("class", "btn-info");
      break;
  }
}

function cambioDeCheckpoint(palabra, numeros) {
  switch (palabra) {
    case 1:
      document.getElementById('no' + numeros).checked = false;
      break;
    case 2:
      document.getElementById('si' + numeros).checked = false;
      break;
  }
}
