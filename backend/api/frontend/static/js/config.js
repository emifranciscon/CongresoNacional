$(document).ready(function() {

  $('.datepicker').datepicker({language: "es", format: 'yyyy-mm-dd', startDate: '-100y', autoclose: true, orientation: "bottom auto"});

  alertify.defaults.transition = "slide";
  alertify.defaults.theme.ok = "btn btn-primary";
  alertify.defaults.theme.cancel = "btn btn-danger";
  alertify.defaults.theme.input = "form-control";

  alertify.defaults.glossary.title = "Atención!";
  alertify.defaults.glossary.ok = "Confirmar";
  alertify.defaults.glossary.cancel = "Cancelar";

});
