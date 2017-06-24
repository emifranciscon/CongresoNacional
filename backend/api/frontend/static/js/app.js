var si = new Array(24)
var no = new Array(24)
$.validator.setDefaults( {
	submitHandler: function (form) {
		debugger;
		if (form.id=="formDatosPers") {
			document.getElementById('ventana1').style.display = 'none';
			document.getElementById('ventana2').style.display = 'block';
			document.getElementById('ventana3').style.display = 'none';
			document.getElementById('btn-datosPers').setAttribute("class", "btn-info");					
			document.getElementById('btn-datosMov').setAttribute("class", "btn-primary");
			document.getElementById('btn-datosMed').setAttribute("class", "btn-info");
		};
		if (form.id=="formDatosMov") {
			document.getElementById('ventana1').style.display = 'none';
			document.getElementById('ventana2').style.display = 'none';
			document.getElementById('ventana3').style.display = 'block';
			document.getElementById('btn-datosPers').setAttribute("class", "btn-info");					
			document.getElementById('btn-datosMov').setAttribute("class", "btn-info");
			document.getElementById('btn-datosMed').setAttribute("class", "btn-primary");
		};
		if (form.id=="formDatosMedicos") {
			debugger		
			var nombre=document.getElementById('nombre').value
			var apellido=document.getElementById('apellido').value
			var documento=document.getElementById('documento').value
			var mail=document.getElementById('mail').value
			var mail2=document.getElementById('mail2').value
			var fecha=document.getElementById('fecha').value
			var telefonoPersonal=document.getElementById('telefonoPersonal').value
			var telefonoEmergencia=document.getElementById('telefonoEmergencia').value
			var dieta=document.getElementById('dieta').value
			var GFamiliar=document.getElementById('GFamiliar').value
			for (var i = 1; i < 26; i++) {
				si[i]=document.getElementById('si'+i).checked
				no[i]=document.getElementById('no'+i).checked
				if (si[i]== no[i]) {
					alert("por favor complete todas las consultas")
					break
				}
			};
			debugger
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
			var body = '{"data_person":{"nombre":"'+nombre+'","apellido":"'+apellido+'","num_doc":'+documento+',"email_personal":"'+mail+'","tel_emergencia":"'+telefonoEmergencia+'","tel_personal":"'+telefonoPersonal+'","fecha_nacimiento":"'+fecha+'","talle":"M","descripcion_dieta":"'+dieta+'","num_eslabon":35,"fecha_eslabon":"2014-4-9","email_contacto":"'+mail2+'","pago_remera":false,"descripcion_familia":"Con dos hijos","descripcion_registro":"","diocesis":"Villa Maria","estado":"PreInscripto"},"medical_record":{"asma":'+asma+',"enfisema":'+enfisema+',"broquitis_cronica":'+broquitis_cronica+',"alergias":"","otras_respiratorias":"","hipertension":'+hipertension+',"hipotension":'+hipotension+',"infarto_cardiaco":'+infarto_cardiaco+',"disritmia_cardiaca":'+disritmia_cardiaca+',"malformacion_corazon":'+malformacion_corazon+',"otras_circulatorias":"","dolor_ciatico":'+dolor_ciatico+',"escoliosis":'+escoliosis+',"miastenia":'+miastenia+',"otras_musculoesque":"","diabetes":'+diabetes+',"hipertiroidismo":'+hipertiroidismo+',"otras_hormonales":"","medicacion_actual":'+medicacion_actual+',"comprimidos":"","inyectables":"","dificultad_leer":'+dificultad_leer+',"vision_doble":'+vision_doble+',"dificultad_colores":'+dificultad_colores+',"dificultad_colores_desc":"","dificultad_oir":'+dificultad_oir+',"epilepsia":'+epilepsia+',"derrame":'+derrame+',"derrame_desc":"","jaquecas":'+jaquecas+',"otras_nerviosas":"","vertigo":'+vertigo+',"claustrofobia":'+claustrofobia+',"aragnofobia":'+aragnofobia+',"otras_enfermedades":"","fuma":'+fuma+',"nadar":false,"peso":"","altura":"","grupo_sanguineo":"","ser_att_medica":"","medico_cabecera":"","hospital_derivacion":"","aclaracion":""}}'
			debugger	
		};		
	}
} );
jQuery.validator.addMethod("notEqual", function(value, element, param) {
  return this.optional(element) || value != param;
}, "Please specify a different (non-default) value");
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z+ñ\s]+$/i.test(value);
}, "Letters only please"); 

$( document ).ready( function () {
	$( "#formDatosPers" ).validate( {
		rules: {
			nombre: {
				required: true,
				lettersonly: true
			},
			apellido:  {
				required: true,
				lettersonly: true
			},
			telefonoEmergencia:{
				required: true,
				digits: true,
				minlength: 10,
			},
			telefonoPersonal:{
				required: true,
				digits: true,
				minlength: 10
			},
			documento: {
				required: true,
				digits: true,
				minlength: 8
			},
			mail: {
				required: true,
				email: true
			},
			mail2: {
				required: true,
				email: true
			},
			fecha: {
				required: true
			}
		},
		messages: {
			nombre: {
				required: "Por favor, ingrese su nombre.",
				lettersonly: "Por favor, ingrese solo letras sin asento."
			},
			apellido: {
				required: "Por favor, ingrese su apellido.",
				lettersonly: "Por favor, ingrese solo letras sin asento."
			},
			telefonoEmergencia: {
				required: "Por favor, ingrese un telefono de emercencia.",
				digits: "Por favor, ingrese solo digitos.",
				minlength: "Su dni contiene 12 digitos",
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
			mail: "Por favor, ingrese su email correctamente.",
			mail2:"Por favor, ingrese su email de emegencia correctamente.",
			fecha: "Por favor, ingrese fecha"
		},
		errorElement: "em",
		errorPlacement: function ( error, element ) {
			// Add the `help-block` class to the error element
			error.addClass( "help-block" );

			// Add `has-feedback` class to the parent div.form-group
			// in order to add icons to inputs
			element.parents( ".col-sm-5" ).addClass( "has-feedback" );

			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.parent( "label" ) );
			} else {
				error.insertAfter( element );
			}

			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !element.next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
			}
		},
		success: function ( label, element ) {
			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !$( element ).next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
			}

		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
			$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
		},
		unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
			$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
		}
	} );
	$( "#formDatosMov" ).validate( {
		rules: {
			eslabon: {
				required: true,
				digits: true,
			},
			diocesis: {
				required: true,
				lettersonly: true
			},
			encargado: {
				required: true
			},
			fecha: {
				required: true
			},
			añoEsl:{
				required: true,
				digits: true,
				maxlength: 4,
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
				required: "Por favor, seleccione una persona.",	
			},
			fecha: "Por favor, ingrese fecha",
			añoEsl: {
				required: "Por favor, ingrese el año que hizo el eslabon.",
				digits: "Por favor, ingrese solo digitos.",
				maxlength: "El año no contiene mas de 4 digitos",
			},
			talle:{
				required: "Por favor, seleccione un talle"
			}
		},
		errorElement: "em",
		errorPlacement: function ( error, element ) {
			// Add the `help-block` class to the error element
			error.addClass( "help-block" );

			// Add `has-feedback` class to the parent div.form-group
			// in order to add icons to inputs
			element.parents( ".col-sm-5" ).addClass( "has-feedback" );

			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.parent( "label" ) );
			} else {
				error.insertAfter( element );
			}

			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !element.next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
			}
		},
		success: function ( label, element ) {
			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !$( element ).next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
			}

		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
			$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
		},
		unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
			$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
		}
	} );
	$( "#formDatosMedicos" ).validate( {
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
		errorPlacement: function ( error, element ) {
			// Add the `help-block` class to the error element
			error.addClass( "help-block" );

			// Add `has-feedback` class to the parent div.form-group
			// in order to add icons to inputs
			element.parents( ".col-sm-5" ).addClass( "has-feedback" );

			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.parent( "label" ) );
			} else {
				error.insertAfter( element );
			}

			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !element.next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
			}
		},
		success: function ( label, element ) {
			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if ( !$( element ).next( "span" )[ 0 ] ) {
				$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
			}

		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
			$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
		},
		unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
			$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
		}
	} );
	
} );
function atrasVentana(numPestaña){
	switch(numPestaña) {
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

function cambioDeCheckpoint(palabra,numeros){
	switch(palabra) {
		case 1:
			document.getElementById('no'+numeros).checked = false;  
		break;
		case 2:
			document.getElementById('si'+numeros).checked = false;
		break;
	}
}

