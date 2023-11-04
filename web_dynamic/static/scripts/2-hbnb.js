$(document).ready(function () {
  const dict = {};
  const $amenitiesCheck = $('input[type=checkbox]');
  const $selectedAmenities = $('div.amenities h4');

  function updateApiStatusClass(status){
    if (status == 'OK'){
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  }

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    const status = data.status;

    updateApiStatusClass(status);
});

  $amenitiesCheck.click(function () {
    if ($(this).is(':checked')) {
      dict[$(this).data('id')] = $(this).data('name');
      $selectedAmenities.text(Object.values(dict).join(', '));
    } else if ($(this).is(':not(:checked)')) {
      delete dict[$(this).data('id')];
      $selectedAmenities.text(Object.values(dict).join(', '));
    }
  });
});