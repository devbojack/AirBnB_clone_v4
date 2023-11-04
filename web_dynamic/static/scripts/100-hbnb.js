$(document).ready(function () {
  const dict = {};
  const $amenitiesCheck = $('input[type=checkbox]');
  const $selectedAmenities = $('div.amenities h4');
  const $filterPlacesButton = $('section.filters button');
  const $statusIndicator = $('div#api_status');
  const statusUri = 'http://localhost:5001/api/v1/status/';
  const placesUri = 'http://localhost:5001/api/v1/places_search/';
  const $placesSection = $('section.places');
  const $locationsDiv = $('div.locations h4');

  function updateLocationsTag() {
    const selectedLocations = Object.values(dict).join(', ');
    $locationsDiv.text(selectedLocations);
  }

  async function refreshHtmlPlaces(amenities = {}, cities = {}, states = {}) {
    const data = {
      amenities,
      cities,
      states,
    };

    const places = await fetchPlaces(data);

    $placesSection.text(''); 

    for (let i = 0; i < places.length; ++i) {
      $placesSection.append(createPlace(places[i]));
    }
  }

  function fetchPlaces(data) {
    return $.ajax({
      url: placesUri,
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
  }

  $filterPlacesButton.on('click', function () {
    const amenityIds = Object.keys(dict);

    refreshHtmlPlaces(amenityIds);
  });

  $amenitiesCheck.click(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      dict[id] = name;
    } else {
      delete dict[id];
    }

    updateLocationsTag();
  });

  $.ajax({
    url: statusUri,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $statusIndicator.addClass('available');
      } else {
        $statusIndicator.removeClass('available');
      }
    }
  });

  refreshHtmlPlaces();
});
