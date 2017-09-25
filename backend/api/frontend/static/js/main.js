$(document).ready(function() {

  $( "#tipo_asistencia" ).change(function() {
    event.preventDefault();
    console.log()
    if($(this).val() === 'SERVIDOR'){
      $('#wrapper').show();
      $('#comision').attr('required','')
      $('#first_quiere_material').attr('required','')
      $('#first_duerme_en_universidad').attr('required','')
      $('#comidas').attr('required','')
    }else{
      $('#comision').removeAttr('required')
      $('#first_quiere_material').removeAttr('required')
      $('#first_duerme_en_universidad').removeAttr('required')
      $('#comidas').removeAttr('required')
      $('#wrapper').hide();
    }
  });

  $('#btn-atras').click(function(event) {
    event.preventDefault();
    hideForm('#id-container-fichamed');
    showForm('#id-container-dataperson');
  });

  $('#btn-reset').click(function(event) {
    event.preventDefault();
    register()
  });

  $('#btn-test').click(function(event) {
    event.preventDefault();
    console.log(JSON.stringify(getObjetFromFormAux()))
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


    $.ajax({

      data: JSON.stringify(dataToPost), //datos que se envian a traves de ajax
      url: "/api/register", //archivo que recibe la peticion
      type: 'POST', //método de envio
      success: function(data, textStatus, jqXHR) { //una vez que el archivo recibe el request lo procesa y lo devuelve
        alertify.alert('Atención!', 'Registro realizado con Éxito!!', function(){
          location.reload(true);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        status = jqXHR.status
        if (status === '400') {
          var resp = JSON.parse(jqXHR.responseText)

          if (resp.hasOwnProperty('num_doc') && resp.num_doc[0] === "Ya existe un/a person con este/a num doc.") {
            msgCustom("El documento ingresado, ya esta registrado...", function() {})
          }else{
            msgCustom(jqXHR.responseText, function() {})
          }

        } else if (status === '409') {
          msgCustom("Ah llegado al limite máximo de inscripciones...", function() {})
        } else {
          msgCustom("Ah ocurrido un problema, vuelve  a intentar mas tarde. Si el problema persiste, por favor contactar con el administrador del sitio.", function() {})
        }

        //console.log("status: %d -- msg: %s", jqXHR.status, jqXHR.responseText)
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
        ok: 'Aceptar',
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

    $("#main-form div .row div input[type=radio]:checked").each(function(index) {
      value = $(this).val() === 'Si'
        ? true
        : false;

      obj[$(this).attr("name")] = value

    });

    return obj
  }

  function getObjetFromFormAux() {
    var radioButtons = $('#formDatosMedicos input[type=radio]:checked');
    var textsArea = $('#formDatosMedicos textarea');
    var textsSimple = $('#formDatosMedicos input[type=text]');
    var combos = $('#formDatosMedicos select');

    var merge = radioButtons.add(textsArea).add(textsSimple).add(combos);

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

  function loadData(id_element, uri) {
    var combo = document.getElementById(id_element)
    $.ajax({method: "GET", url: uri}).done(function(data) {

      option = document.createElement("option");
      text_option = document.createTextNode("Todos");
      option.appendChild(text_option);
      option.setAttribute("value", '');
      //combo.appendChild(option);

      for (var i = 0; i < data.length; i++) {
        option = document.createElement("option");
        text_option = document.createTextNode(data[i]['nombre']);
        option.appendChild(text_option);
        option.setAttribute("value", data[i]['id'])
        combo.appendChild(option);
      }

      $(combo).selectpicker('refresh');


    })
  }
  loadData('comision', '/api/comisiones/')
  loadData('comidas', '/api/comidas/')

});
