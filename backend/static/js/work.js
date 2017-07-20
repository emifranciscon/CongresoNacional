$(document).ready(function() {

  Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key))
        size++;
      }
    return size;
  };

  function getRow(data) {
    var table = document.getElementById('table-content') // Create a <tr> node
    $("#table-content tr").remove();

    var fields = [
      'nombre',
      'apellido',
      'num_doc',
      'diocesis',
      'estado',
      'fecha_registro',
      'email_personal',
      'tel_personal',
      'pago_remera',
      'descripcion_registro'
    ];

    for (var i = 0; i < data.length; i++) {

      row = document.createElement("tr");
      obj = data[i];

      row.setAttribute("reference_id", obj['id']);

      column = document.createElement("td");
      input = document.createElement("input");
      input.setAttribute("type", "checkbox")
      input.setAttribute("class", "checkthis")
      input.setAttribute("name", "checkgeneral")

      column.appendChild(input)
      row.appendChild(column)

      //console.log(row)
      for (var j = 0; j < fields.length; j++) {
        field = fields[j]
        value = obj[field]
        if (field === 'descripcion_registro') {
          center = document.createElement("center");
          button = document.createElement("button");
          button.setAttribute("text", value);
          button.setAttribute("class", 'btn btn-info descripcion_registro');
          icon = document.createElement("span");
          icon.setAttribute("class", 'glyphicon glyphicon-zoom-in');
          button.appendChild(icon);
          column = document.createElement("td");
          center.appendChild(button)
          column.appendChild(center);
          row.appendChild(column);
        } else if( field === 'pago_remera') {
          center = document.createElement("center");

          //<th><input type="checkbox" id="checkall" /></th>
          column = document.createElement("td");
          input = document.createElement("input");
          input.setAttribute("type", "checkbox");
          input.setAttribute("class", "checkremera")
          input.checked = value
          input.setAttribute("id_element",obj['id'])
          center.appendChild(input)
          column.appendChild(center)
          row.appendChild(column)

        }else{
          column = document.createElement("td");
          text_column = document.createTextNode(value);
          column.appendChild(text_column);
          row.appendChild(column);
        }

      }

      table.appendChild(row)

    }
  }

  function getPerson(parameters) {

    url = '/api/person/?';

    //ME QUEDO SOLO CON LOS PARAMETROS QUE NO SON CADENAS VACIAS
    var map = new Object();
    $.each(parameters, function(key, value) {
      if (value !== "") {
        map[key] = value;
      }
    });

    //ARMO DINAMICAMENTE LA URL
    size_params = Object.size(map);
    counter_params = 0;

    $.each(map, function(key, value) {
      counter_params++;
      console.log(size_params, counter_params)
      if (size_params === counter_params) {
        url += (key + "=" + value)
      } else {
        url += (key + "=" + value + "&")
      }
    });

    console.log('GET URI: %s', url)

    $.ajax({method: "GET", url: url}).done(function(data) {

      getRow(data);
      $(".descripcion_registro").click(function() {
        var text = $(this).attr('text')
        alertify.alert('Observaciones', text, function() {});
      });

      $(".checkremera").change(function() {
           var cb = $(this);
           var id_element = cb.attr('id_element');
           var state = $(this).prop('checked')
           console.log(id_element,state)

          var dataToUpdate = {
            "id_person": id_element,
            "value":state.toString()
          }

          console.log(id_element, $(this).prop('checked'), dataToUpdate)

           $.ajax({
             data: JSON.stringify(dataToUpdate), //datos que se envian a traves de ajax
             url: "/api/pago_update/", //archivo que recibe la peticion
             type: 'PUT', //método de envio
             success: function(data, textStatus, jqXHR) { //una vez que el archivo recibe el request lo procesa y lo devuelve
              console.log("success")
              cb.prop('checked', state);

             },
             error: function(jqXHR, textStatus, errorThrown) {
               console.log("error")
               cb.prop('checked', !state);
             },
             contentType: 'application/json',
             dataType: 'json'
           });
      });


    })

  }

  function loadData(id_element, uri) {
    var combo = document.getElementById(id_element)
    $.ajax({method: "GET", url: uri}).done(function(data) {

      option = document.createElement("option");
      text_option = document.createTextNode("Todos");
      option.appendChild(text_option);
      option.setAttribute("value", '');
      combo.appendChild(option);

      for (var i = 0; i < data.length; i++) {
        option = document.createElement("option");
        text_option = document.createTextNode(data[i]['nombre']);
        option.appendChild(text_option);
        option.setAttribute("value", data[i]['id'])
        combo.appendChild(option);
      }

    })
  }

  function getElementsToUpdate() {
    var listToEdit = []
    $("#table-content tr").each(function() {
      row = $(this)

      checkbox = row.find('input[type=checkbox]')
      if (checkbox.is(":checked")) {
        id_person = row.attr("reference_id");
        listToEdit.push(id_person)
      }

    });

    return listToEdit;
  }

  function getParameters() {
    var apellido = $('#text-apellido').val()
    var documento = $('#text-documento').val()
    var diocesis = $('#combo-dio').val()
    var estado = $('#combo-est').val()

    return {"apellido": apellido, "num_doc": documento, "diocesis": diocesis, "estado": estado}
  }

  function applyEventTable() {
    $("#table #checkall").click(function() {
      if ($("#table #checkall").is(':checked')) {
        $("#table input[name='checkgeneral']").each(function() {
          $(this).prop("checked", true);
        });

      } else {
        $("#table input[name='checkgeneral']").each(function() {
          $(this).prop("checked", false);
        });
      }
    });
  }

  function search() {
    getPerson(getParameters());
  }

  function cleanModal() {
    $('#combo-est-modal').selectpicker('val', '');
    $('#observaciones-modal').val("");
  }

  function applyEvents() {
    $('#btn-buscar').click(function() {
      search()
    });

    $('#btn-acciones').click(function() {
      var elementToUpdate = getElementsToUpdate();
      if (elementToUpdate.length > 0) {
        cleanModal();
        $("#myModal").modal();
      } else {
        alertify.alert('Atención!', 'No ha seleccionado ningún elemento.', function() {});
      }
    });

    $('#btn-confirmar-modal').click(function() {
      var elementToUpdate = getElementsToUpdate();
      var stateToUpdate = $('#combo-est-modal').val()
      var observaciones = $('#observaciones-modal').val()

      if (stateToUpdate === "") {
        $('#label-error-modal').text("Seleccione un estado.")
        $('#label-error-modal').removeClass('hide')
      } else if (observaciones.length > 500) {
        $('#label-error-modal').text("Campo Observaciones no puede superar los 500 caracteres.")
        $('#label-error-modal').removeClass('hide')
      } else {
        $('#label-error-modal').addClass('hide')
        var dataToUpdate = {
          persons: elementToUpdate,
          state: stateToUpdate,
          observaciones: observaciones
        };

        $.ajax({
          data: JSON.stringify(dataToUpdate), //datos que se envian a traves de ajax
          url: "/api/update/", //archivo que recibe la peticion
          type: 'PUT', //método de envio
          success: function(data, textStatus, jqXHR) { //una vez que el archivo recibe el request lo procesa y lo devuelve
            alertify.success('Actualización Éxitosa!');
            search()
            $('#myModal').modal('toggle');
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log("status: %d -- msg: %s", jqXHR.status, jqXHR.responseText)
            alertify.error('Hubo un error en la actualización!');
          },
          contentType: 'application/json',
          dataType: 'json'
        });

      }
    });
  }

  applyEventTable();
  applyEvents();
  loadData('combo-est', '/api/estados/')
  loadData('combo-est-modal', '/api/estados/')
  loadData('combo-dio', '/api/diocesis/')

});
