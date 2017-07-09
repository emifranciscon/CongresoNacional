$(document).ready(function() {

  $('#btn-atras').click(function(event) {
    event.preventDefault();
    hideForm('#id-container-fichamed');
    showForm('#id-container-dataperson');
  });

  $('#btn-reset').click(function(event) {
    event.preventDefault();
    register()
  });

  $('#main-form').parsley().on('field:validated', function() {
    var ok = $('.parsley-error').length === 0;
  }).on('form:submit', function() {
    hideForm('#id-container-dataperson');
    showForm('#id-container-fichamed');

    return false; // Don't submit form for this demo
  }).on('form:error', function() {});

  $('#formDatosMedicos').parsley().on('field:validated', function() {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
    $('.bs-callout-warning').toggleClass('hidden', ok);
  }).on('form:submit', function() {
    register()
    return false; // Don't submit form for this demo
  }).on('form:error', function() {});

  function register() {
    //show as confirm
    var nombre = $('#nombre').val() + " " + $('#apellido').val()
    msgCustom("Se llevara a cabo la inscripción de " + nombre, post)

  }

  function post() {
    $('#btn-atras').addClass('disabled');
    $('#btn-registrar').addClass('disabled');

    var dataToPost = {
      "data_person": getObjetFromForm(),
      "medical_record": getObjetFromFormAux()
    }

    console.log(JSON.stringify(dataToPost))

    $.ajax({

      data: JSON.stringify(dataToPost), //datos que se envian a traves de ajax
      url: "/api/register", //archivo que recibe la peticion
      type: 'POST', //método de envio
      success: function(data, textStatus, jqXHR) { //una vez que el archivo recibe el request lo procesa y lo devuelve
        alertify.alert('Atencion!', 'Registro realizado con exito!!', function(){
          location.reload(true);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        status = jqXHR.status
        if (status === '400') {
          var resp = JSON.parse(jqXHR.responseText)

          if (resp.hasOwnProperty('num_doc') && resp.num_doc[0] === "Ya existe un/a person con este/a num doc.") {
            msgCustom("El documento ingresado, ya esta registrado...", function() {})
          }

        } else if (status === '409') {
          msgCustom("Ah llegado al limite máximo de inscripciones...", function() {})
        } else {
          msgCustom("Ah ocurrido un problema, vuelve  a intentar mas tarde. Si el problema persiste, por favor contactar con el administrador del sitio.", function() {})
        }

        console.log("status: %d -- msg: %s", jqXHR.status, jqXHR.responseText)
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  }

  function msgCustom(msg, success) {
    var pre = document.createElement('p');
    //custom style. <i class="fa fa-check" aria-hidden="true"></i>
    pre.style.margin = "0";
    pre.style.padding = "24px";
    pre.style.textAlign = "justify";
    pre.style.fontSize = "medium";
    pre.appendChild(document.createTextNode(msg));
    //show as confirm
    alertify.confirm(pre, success, function() {}).set({
      labels: {
        ok: 'Acceptar',
        cancel: 'Cancelar'
      },
      padding: false
    });

  }

  function getObjetFromForm() {
    var obj = {}
    $("#main-form div .row div .form-control").each(function(index) {
      obj[$(this).attr("id")] = $(this).val()

    });

    return obj
  }

  function getObjetFromFormAux() {
    var radioButtons = $('#formDatosMedicos input[type=radio]:checked');
    var textsArea = $('#formDatosMedicos textarea');
    var textsSimple = $('#formDatosMedicos input[type=text]');

    var merge = radioButtons.add(textsArea).add(textsSimple);

    var obj = {}
    $(merge).each(function(index) {
      var value;
      if ($(this).attr("type") === 'radio') {
        value = $(this).val() === 'Si'
          ? true
          : false;
      } else {
        value = $(this).val();
      }

      obj[$(this).attr("name")] = value
    });
    return obj
  }

  function hideForm(idForm) {
    $(idForm).css({display: "none"});
  }
  function showForm(idForm) {
    $(idForm).css({display: "block"});
  }

});
