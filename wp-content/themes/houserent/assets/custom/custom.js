(function ($) {
    "use strict"; 
    var ajaxurl = houserent.ajaxurl;

    // favorite property
    $(".property-favorites").on('click', function(e) {
        e.preventDefault();
        var this_button = $(this), 
            data_type = $(this).data("type"), 
            fav_id = $(this).data("fav-id"), 
            data_nonce = $(this).data("nonce"); 
        $.ajax({
            type: "GET",
            url: ajaxurl, 
            dataType: 'html',
            data: ({ 
                action: 'houserent_property_favorite', 
                data_type: data_type,
                fav_id: fav_id,
                data_nonce: data_nonce,
            }),
            beforeSend: function () {
                if(data_type == "remove") {
                    this_button.data("type", "add"); 
                    this_button.attr("data-original-title", "Add To Favorites"); 
                    this_button.removeClass("fa-star").addClass("fa-star-o"); 
                } else {
                    this_button.data("type", "remove");
                    this_button.attr("data-original-title", "Remove From Favorites"); 
                    this_button.removeClass("fa-star-o").addClass("fa-star");
                }

            },
            success : function( response ) {
                if(data_type == "remove") {
                    this_button.data("type", "add"); 
                    this_button.attr("data-original-title", "Add To Favorites"); 
                    this_button.removeClass("fa-star").addClass("fa-star-o"); 
                } else {
                    this_button.data("type", "remove");
                    this_button.attr("data-original-title", "Remove From Favorites"); 
                    this_button.removeClass("fa-star-o").addClass("fa-star");
                }
            },
        });
    });

})(jQuery);
