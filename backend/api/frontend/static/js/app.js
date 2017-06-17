
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
			generate_qr()
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
			},
			talle: {
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
			fecha: "Por favor, ingrese fecha",
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
			añoEsl:{
				required: true,
				digits: true,
				maxlength: 4,
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
			añoEsl: {
				required: "Por favor, ingrese el año que hizo el eslabon.",
				digits: "Por favor, ingrese solo digitos.",
				maxlength: "El año no contiene mas de 4 digitos",
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

