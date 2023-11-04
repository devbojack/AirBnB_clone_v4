$(document).ready(function(){
    var amenityIds = [];

    $('input[type="checkbox"]').change(function(){
        var amenityId = $(this).data('id');

        if ($(this).is(':checked')){
            amenityIds.push(amenityId);
        }
        else {
            var index = amenityIds.indexOf(amenityId);
            if (index > -1) {
                amenityIds.splice(index, 1);
            }
        }

        var amenitiesText = amenityIds.join(', ');
        $('#amenities h4').text(amenitiesText);
    });
});

