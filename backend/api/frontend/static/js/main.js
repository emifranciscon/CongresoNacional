$(document).ready(function() {

  var si = new Array(24);
  var no = new Array(24);

  $('#btn-atras').click(function(event) {
    event.preventDefault();
    hideForm('#id-container-fichamed');
    showForm('#id-container-dataperson');
  });
/*
  $('#btn-registrar').click(function(event) {
    event.preventDefault();

    validateFichaMedica()

    console.log(getObjectFromMedicalForm())
  });
*/
  $('#main-form').parsley().on('field:validated', function() {
    var ok = $('.parsley-error').length === 0;
    hideForm('#id-container-dataperson');
    showForm('#id-container-fichamed');
  }).on('form:submit', function() {
    hideForm('#id-container-dataperson');
    showForm('#id-container-fichamed');
    return false; // Don't submit form for this demo
  }).on('form:error', function() {

  });

  $('#formDatosMedicos').parsley().on('field:validated', function() {
    var ok = $('.parsley-error').length === 0;
    $('.bs-callout-info').toggleClass('hidden', !ok);
    $('.bs-callout-warning').toggleClass('hidden', ok);
  }).on('form:submit', function() {
    var dataToPost = {
      "data_person":getObjetFromForm(),
      "medical_record":getObjetFromFormAux()
    }

    console.log(JSON.stringify(dataToPost))
    return false; // Don't submit form for this demo
  }).on('form:error', function() {
  });

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
      if($(this).attr("type") === 'radio'){
        value = $(this).val() === 'Si' ?  true : false;
      }else {
        value = $(this).val();
      }

      obj[$(this).attr("name")] = value
    });
    return obj
  }


  function getObjectFromMedicalForm() {
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

    return {
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

  function hideForm(idForm) {
    $(idForm).css({display: "none"});
  }
  function showForm(idForm) {
    $(idForm).css({display: "block"});
  }

  function validateFichaMedica() {
    for (var i = 1; i < 26; i++) {
      si[i] = document.getElementById('si' + i).checked
      no[i] = document.getElementById('no' + i).checked
      if (si[i] == no[i]) {
        alert("por favor complete todas las consultas")
        break
      }
    };
  }

});
