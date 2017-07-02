$(document).ready(function() {



  $('#main-form').parsley().on('field:validated', function() {
      var ok = $('.parsley-error').length === 0;
      $('.bs-callout-info').toggleClass('hidden', !ok);
      $('.bs-callout-warning').toggleClass('hidden', ok);
    })
    .on('form:submit', function() {
      console.log("return false")

      return false; // Don't submit form for this demo
    });

  function getObjetFromForm(){
    var obj = {}
    $( "#main-form div .row div .form-control" ).each(function( index ) {
        obj[$( this ).attr("id")] = $( this ).val()

    });

    return obj
  }



});
