$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var url = form.attr('action');
    var $submitButton = form.find('button[type="submit"]');
    var $responseSection = $('#response-section');

    $submitButton.addClass('loading-state').prop('disabled', true);
    $submitButton.text('Requesting...');

    $.ajax({
      type: 'POST',
      url: url,
      data: form.serialize(),
      success: function(responseData) {
        var jsonString = JSON.stringify(responseData, null, 2);
        $responseSection.html('<h2>Response</h2><pre>' + jsonString + '</pre>');
      },
      error: function(xhr, status, error) {
        console.error(error);
        $responseSection.html('<p>Error: Internal Server Error</p>');
      },
      complete: function() {
        $submitButton.removeClass('loading-state').prop('disabled', false);
        $submitButton.text('Submit');
      }
    });
  });
});