(function ($) {
	"use strict";

	var $houserent = houserent;
	var modelApp = {
		/* ---------------------------------------------
		 Menu
		 --------------------------------------------- */
		ajax: function() {
			function ajaxPost($selector, $ajaxURL) {
				var $ajaxPost = $($selector);
				var $nextSelector = $($ajaxURL);

				$ajaxPost.each(function(){
					var $self = $(this);
					var $loadMoreBtn = $self.next().find('a');

					var $loadingImage = $('<i class="fa fa-gear fa-spin"></i><span>'+ $houserent.rental_page_loading_text +'</span>');

					var $olderPostsUrl = $loadMoreBtn.attr('href');
					var $postsContainer = $self;

					if ($olderPostsUrl === undefined) {
					    $loadMoreBtn.text( $houserent.rental_nomore_text );
					}
					$loadMoreBtn.on('click', function(e){
						e.preventDefault();
					    if ($olderPostsUrl !== undefined) {

					        $loadMoreBtn.html($loadingImage);

					        $.get($olderPostsUrl, function(result) {
					            var $html = $(result);
					            var $newContent = $($ajaxPost.selector, $html).contents();
					            $postsContainer.append($newContent);

					            $postsContainer.imagesLoaded(function() {
					                $olderPostsUrl = $($nextSelector.selector, $html).attr('href');

					                // If there are no more posts
					                if ($olderPostsUrl == undefined) {
					                    $loadMoreBtn.html( $houserent.rental_nomore_text );
					                    $loadMoreBtn.parent().addClass('disable');
					                    $loadMoreBtn.parent().hide();
					                } else {
					                    $loadMoreBtn.html( $houserent.rental_loadmore_text );
					                }
					                $html = "";
					            });
					        });
					    }
					});
				});
			}
			ajaxPost('.popular-posts', '.ajax-load-more a');
			ajaxPost('.newest-items-content', '.newest-ajax-load-more a');
			ajaxPost('.oldest-to-newest', '.oldest-ajax-load-more a');
			ajaxPost('.price-heigh-to-low', '.price-heigh-ajax-load-more a');
			ajaxPost('.price-low-to-heigh', '.price-low-ajax-load-more a');
			//ajaxPost('.search-posts-rental', '.search-ajax-load-more a');
		},
		/* ---------------------------------------------
		 Menu
		 --------------------------------------------- */
		auto_complate: function() {
			var search_item_obj = $houserent.search_queries,
				search_array = $.map( search_item_obj, function( value,index ){
					return [value];
				});
		    $( ".tags" ).autocomplete({
		      	source: search_array
		    });
		},

		/* ---------------------------------------------
		 Menu
		 --------------------------------------------- */
		menu: function() {
		    var $combinedmenu = $(".site-navigation .menu-list").clone();
		    $combinedmenu.appendTo("#mobile-main-nav #main-mobile-container");

		    var $submenu = $("#mobile-main-nav .menu-list li, .overlay .overlay-menu").has(".sub-menu"),
		    	$submenuTop = $(".overlay .overlay-menu").has(".sub-menu"),
		    	$submenuTopSelector = $(".overlay-menu li .sub-menu"),
		        $submenuSelector = $(".sub-menu"),
		        $mobileNavSelector = $("#main-mobile-container .main-navigation"),
		        $mobileNavOverlay = $(".mobile-menu-main .menucontent.overlaybg, .mobile-menu-main .slideLeft"),
		        $mobileMenuContent = $(".mobile-menu-main .menucontent"),
		        $mobileNavBar = $("#navtoggole-main"),
		        $mobileNav = $(".menu-mobile"),
		        $menuWrap = $(".menu-list");

	        if ($submenuTop) {
	            var $hasSubmenuIcon = $("<span class='fa fa-angle-down'></span>");
	            $submenuTopSelector.prev().append($hasSubmenuIcon);
	        }
		    // Main Navigation Mobile
		    // --------------------------------            
		    $mobileNavSelector.addClass("slideLeft");

		    var menuopen_main = function() {
		            $mobileNavOverlay.removeClass("menuclose").addClass("menuopen");
		        },
		        menuclose_main = function() {
		            $mobileNavOverlay.removeClass("menuopen").addClass("menuclose");
		        };

		    $mobileNavBar.on("click", function() {
		        if ($mobileMenuContent.hasClass("menuopen")) {
		            $(menuclose_main);
		        } else {
		            $(menuopen_main);
		        }
		    });
		    $mobileMenuContent.on("click", function() {
		        if ($mobileMenuContent.hasClass("menuopen")) {
		            $(menuclose_main);
		        }
		    });

		    // Sub Menu
		    // -------------------------------- 
		    var $mobileExtendBtn = $("<span class='menu-click'><i class='menu-arrow fa fa-plus'></i></span>");
		    $submenu.prepend($mobileExtendBtn);

		    $mobileNav.on("click", function() {
		        $menuWrap.slideToggle("slow");
		    });
		    var $mobileSubMenuOpen = $(".menu-click");
		    $mobileSubMenuOpen.on("click", function() {
		        var $this = $(this);
		        $this.siblings(".sub-menu").slideToggle("slow");
		        $this.children(".menu-arrow").toggleClass("menu-extend");
		    });		    

		    var $mobileSubMenuOpen2 = $(".overlay .overlay-menu .fa-angle-down");
		    $mobileSubMenuOpen2.on("click", function(e) {
		    	e.preventDefault();
		        var $this = $(this);
		        $this.parent().next(".sub-menu").slideToggle("slow");
		        $this.toggleClass("menu-extend");
		    });

		    // For Last menu
		    // --------------------------------
		    var $fullMenuElement = $(".navigation .mainmenu li");
		    $fullMenuElement.on("mouseenter mouseleave", function(e) {
		        var $this = $(this);
		        if ($("ul", $this).length) {
		            var elm = $("ul:first", $this),
		                off = elm.offset(),
		                l = off.left,
		                w = elm.width(),
		                docW = $(".header-bottom > .container").width(),
		                isEntirelyVisible = (l + w <= docW);
		            if (!isEntirelyVisible) {
		                $this.addClass("right-side-menu");
		            } else {
		                $this.removeClass("right-side-menu");
		            }
		        }
		    });

		    var $dropdownSelector = $(".dropdown-menu input, .dropdown-menu label, .dropdown-menu select");
		    $dropdownSelector.on('click',function(e) {
		        e.stopPropagation();
		    });
		},		
		/* ---------------------------------------------
		 Header Overlay
		 --------------------------------------------- */
		header_overlay: function() {
			var	overlay = document.querySelector( 'div.overlay' ),
				closeBttn = overlay.querySelector( 'button.overlay-close' ),
				transEndEventNames = {
					'WebkitTransition': 'webkitTransitionEnd',
					'MozTransition': 'transitionend',
					'OTransition': 'oTransitionEnd',
					'msTransition': 'MSTransitionEnd',
					'transition': 'transitionend'
				},
				transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
				support = { transitions : Modernizr.csstransitions };

			function toggleOverlay() {
				if( classie.has( overlay, 'open' ) ) {
					classie.remove( overlay, 'open' );
					var onEndTransitionFn = function( ev ) {
						if( support.transitions ) {
							if( ev.propertyName !== 'visibility' ) return;
							this.removeEventListener( transEndEventName, onEndTransitionFn );
						}
						classie.remove( overlay, 'close' );
					};
					if( support.transitions ) {
						overlay.addEventListener( transEndEventName, onEndTransitionFn );
					}
					else {
						onEndTransitionFn();
					}
				}
				else if( !classie.has( overlay, 'close' ) ) {
					classie.add( overlay, 'open' );
				}
			}
			var $triggerOverlay = $(".trigger-overlay");
			$triggerOverlay.on("click", function() {
				toggleOverlay();
			});
			closeBttn.addEventListener( 'click', toggleOverlay );

			var $mainSearch = $(".main-search");
			$mainSearch.on("click", function(e) {
				e.preventDefault();
				var $searchOverlay = $(".overlay-search");
				$searchOverlay.addClass("open");
			});
			var $overlayClose = $(".overlay-search .overlay-close");
			$overlayClose.on("click", function(e) {
				e.preventDefault();
				var $searchOverlay = $(".overlay-search");
				$searchOverlay.removeClass("open");
			});
		},
		/* ---------------------------------------------
		Magnifying Pop-up
		--------------------------------------------- */
		popup_window: function() {
		    var $videoPopUp = $(".video-pop-up"),
		        $imagePopUp = $(".image-pop-up");
		    $videoPopUp.magnificPopup({
		        disableOn: 700,
		        type: "iframe",
		        mainClass: "mfp-fade",
		        preloader: false,
		        removalDelay: 300,
		        fixedContentPos: false
		    });            
		    $imagePopUp.magnificPopup({
		        type: "image",
		        mainClass: "mfp-fade"
		    });
		},
 		/* ---------------------------------------------
		 Gallery Style Two Carousel
		 --------------------------------------------- */
		gallary: function () {
			var $sync1 = $(".full-view"),
				$sync2 = $(".list-view"),
				duration = 300;

			$sync1
				.owlCarousel({
					items: 1,
					nav : false,
					owl2row: "true",
					owl2rowTarget: "item"
				})
				.on("changed.owl.carousel", function (e) {
					var syncedPosition = syncPosition(e.item.index);
					if ( syncedPosition !== "stayStill" ) {
						$sync2.trigger("to.owl.carousel", [syncedPosition, duration, true]);
					}
				});
			$sync2
				.owlCarousel({
					margin: 15,
					items: 6,
					nav: false,
					center: false,
					dots: false,
					responsive:{
						280:{
							items: 2
						},
						500:{
							items: 2
						},
						600:{
							items: 3
						},
						800:{
							items: 4
						},
						1000:{
							items: 6
						},
						1200:{
							items: 6
						},
						1400:{
							items: 6
						},
					}
				})
				.on("initialized.owl.carousel", function() {
				   addClassCurrent(0);
				})
				.on("click", ".owl-item", function () {
					$sync1.trigger("to.owl.carousel", [$(this).index(), duration, true]);

				});
				function addClassCurrent( index ) {
					$sync2
						.find(".owl-item.active")
						.removeClass("current")
						.eq( index )
						.addClass("current");
				}
				addClassCurrent(0);
				function syncPosition( index ) {
					addClassCurrent( index );
					var itemsNo = $sync2.find(".owl-item").length;
					var visibleItemsNo = $sync2.find(".owl-item.active").length;
				
					if (itemsNo === visibleItemsNo) {
						return "stayStill";
					}
					var visibleCurrentIndex = $sync2.find(".owl-item.active").index( $sync2.find(".owl-item.current") );
					if (visibleCurrentIndex === 0 && index !== 0) {
						return index - 1;
					}
					if (visibleCurrentIndex === (visibleItemsNo - 1) && index !== (itemsNo - 1)) {
						return index - visibleItemsNo + 2;
					}
					return "stayStill";
				}
		},
		/* ---------------------------------------------
		 Gallery slider
		 --------------------------------------------- */
		gallery: function() {
			var $gallerySlider = $(".gallery-slider");
			$gallerySlider.owlCarousel({
				loop:true,
				items: 3,
				nav: true,
				margin: 15,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsive:{
					280:{
						items:2
					},
					480 : {
						items: 2
					},
					768 : {
					   items: 2
					},
					1200 : {
					   items: 3
					}
				}
			});	
		},
		/* ---------------------------------------------
		 Brand slider
		 --------------------------------------------- */
		brand: function() {
			var $brandSlider = $(".brand-slider");
			$brandSlider.owlCarousel({
				loop: false,
				items: 7,
				margin: 30,
				nav: false,
				responsive:{
					280:{
						items: 2
					},
					480 : {
						items: 3
					},
					768 : {
					   items: 5
					},
					1200 : {
					   items: 7
					},
					1400 : {
						items: 7
					}
				}
			});
		},
 		 /* ---------------------------------------------
		 Count To
		 --------------------------------------------- */
		count: function() {
			var $countSelector = $(".stat-count");
			if($countSelector.length) {	
				$countSelector.countTo();
			}
		},
 		/* ---------------------------------------------
		 Mobile Select
		--------------------------------------------- */
		mobileSelect: function() {
			var $selectSelector = $(".apartment-menu-mobile, .blog-menu-mobile, .about-mobile");
			$selectSelector.on("change", function (e) {
				var url = $(this).val();
				if($.isNumeric(url) === true) {
					var $tabNav = $(".apartment-menu li a, .post-filter-area li a, .about-tab li a");
			    	$tabNav.eq(url).tab('show'); 
				} else {
					window.location = url;
				}
			});
		},
		/* ---------------------------------------------
		 text-slider
		 --------------------------------------------- */
		pogoSlider: function() {
			var $sliderSelector = $(".pogoSlider");
			$sliderSelector.pogoSlider({
				autoplay: false,
				autoplayTimeout: 5000,
				displayProgess: true,
				preserveTargetSize: true,
				targetWidth: 1000,
				targetHeight: 400,
				responsive: true,
				generateNav: false
			}).data('plugin_pogoSlider');
		},

		 /* ---------------------------------------------
		 slider
		 --------------------------------------------- */
		category: function() {
			var $categorySlider = $(".category-slider");
			$categorySlider.owlCarousel({
				loop: true,
				items: 8,
				nav: true,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsive:{
					280:{
						items: 2
					},
					500:{
						items: 3
					},
					600:{
						items: 4
					},
					800:{
						items: 6
					},
					1000:{
						items: 6
					},
					1200: {
						items: 9
					},
					1400: {
						items: 12
					}
				}
			});
		}, 
		/* ---------------------------------------------
		slider
		--------------------------------------------- */
		category_seven: function() {
			var $categorySliderSeven = $(".category-slider-seven");
			$categorySliderSeven.owlCarousel({
				loop: true,
				margin: 0,
				items: 5,
				nav: true,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsive:{
					280:{
						items:2
					},
					480 : {
						items: 3
					},
					768 : {
					   items: 4
					},
					1200 : {
					   items: 5
					}
				}
			})
		},
		/* ---------------------------------------------
		testimonial-slider
		--------------------------------------------- */
		testimonial: function() {
			var $testimonialSlider = $(".testimonial-slider");
			$testimonialSlider.owlCarousel({
				 loop: true,
				 margin: 30,
				 items: 3,
				 responsive:{
					280:{
						items: 1
					},
					500:{
						items: 1
					},
					600:{
						items: 2
					},
					800:{
						items: 2
					},
					1000:{
						items: 3
					},
					1200:{
						items: 3
					},
					1400:{
						items: 3
					}
				}
			});
		},
		/* ---------------------------------------------
		Time Count For Coming Soon
		--------------------------------------------- */
		time_count: function() {
			var $selector = $('.commingsoon-count');
			$selector.each(function(){
			    var $this = $(this),
			        data_year = $this.attr('data-year'),
			        data_month = $this.attr('data-month'),
			        data_day = $this.attr('data-day'),
			        data_hour = $this.attr('data-hour'),
			        data_minutes = $this.attr('data-minutes');
			    $this.syotimer({
			        year: data_year,
			        month: data_month,
			        day: data_day,
			        hour: data_hour,
			        minute: data_minutes
			    });    
			});
		},
		/* ---------------------------------------------
		 Widget Mobile fix
		 --------------------------------------------- */
		widget_mobile: function () {
		    function debouncer(func, timeout) {
		        var timeoutID, timeout = timeout || 500;
		        return function () {
		            var scope = this,
		                args = arguments;
		            clearTimeout(timeoutID);
		            timeoutID = setTimeout(function () {
		                func.apply(scope, Array.prototype.slice.call(args));
		            }, timeout);
		        };
		    }
		    function resized() {
		        var $getWidgetTitle = $(".widget .widget-title"),
		            $getWidgetTitleContent,
		            $windowWidthlocal = $(window).width();
		        if ($windowWidthlocal <= 991) {
		            $getWidgetTitleContent = $getWidgetTitle.parent().nextAll().hide();
		            $getWidgetTitle.addClass("expand-margin");
		            $getWidgetTitle.on("click", function(e) {
		                e.stopImmediatePropagation();
		                var $selfLocal = $(this);
		                $selfLocal.toggleClass("expand");
		                $selfLocal.parent().nextAll().slideToggle();
		                return false;
		            });
		            $getWidgetTitle.each(function(){
		                var $selfLocal = $(this);
		                $selfLocal.parent().addClass("mb-widget");
		            });
		        } else {
		            $getWidgetTitleContent = $getWidgetTitle.parent().nextAll().show();
		            $getWidgetTitle.removeClass("expand-margin");
		            $getWidgetTitle.each(function(){
		                var $selfLocal = $(this);
		                $selfLocal.parent().removeClass("mb-widget");
		            });
		        }
		    }
		    resized();

		    var $windowWidth = $(window).width(),
		        $window = $(window);
		    var prevW = window.innerWidth || $windowWidth;
		    $window.resize(debouncer(function (e) {
		        var currentW = window.innerWidth || $windowWidth;
		        if (currentW !== prevW) {
		            resized();
		        }
		        prevW = window.innerWidth || $windowWidth;
		    }));

		    //Mobile Responsive
		    var $extendBtn = $(".extend-btn .extend-icon");
		    $extendBtn.on("click", function(e) {
		        e.preventDefault();
		        var $self = $(this);
		        $self.parent().prev().toggleClass("mobile-extend");
		        $self.parent().toggleClass("extend-btn");
		        $self.toggleClass("up");
		    });
		},
		/* ---------------------------------------------
		 IPad Parallax Issue
		--------------------------------------------- */
		ipad_parallax: function() {
		    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream || /android/i.test(userAgent) || /windows phone/i.test(userAgent)) {
		        $(".jarallax").each(function(){
		            var $self = $(this);
		            var $getImage = $self.attr("data-jarallax");
		            var $objImage = $.parseJSON( $getImage );
		            $self.css({
		                "background-image": "url("+ $objImage.imgSrc +")",
		                "background-size": "cover",
		                "background-repeat": "no-repeat",
		                "background-position": "center center"
		            });
		        });
		    }
		},
		/* ---------------------------------------------
		 Other Function
		--------------------------------------------- */
		othersFunction: function() {
			var $apartmentDropdown = $(".apartment-menu .dropdown");
			$apartmentDropdown.append("<i class='fa fa-angle-down'></i>");

			var $abailityAreaTwo = $(".availability-area.two table th");
			$abailityAreaTwo.append("<i class='fa fa-angle-down'></i>");

			var $mapIframe = $(".map-content, .map-left-content");

			$mapIframe
			    .on('click',function() {
			    	var $self = $(this);
			        $self.find("iframe").addClass("clicked");
			    })
			    .on('mouseleave', function(){
			    	var $self = $(this);
			        $self.find("iframe").removeClass("clicked");
			    });
			var $videoSelector = $(".entry-content");
			$videoSelector.fitVids();
		},

		/* ---------------------------------------------
		 Scroll top
		 --------------------------------------------- */
	    scroll_top: function () {
	    	var $bodyElement = $("body"),
	    	    $window = $(window),
	    	    $scrollHtml = $("<a href='#top' id='scroll-top' class='topbutton btn-hide'><span class='glyphicon glyphicon-menu-up'></span></a>");

	    	$bodyElement.append($scrollHtml);

	    	var $scrolltop = $("#scroll-top");
	    	$window.on("scroll", function() {
	    	    if ($(this).scrollTop() > $(this).height()) {
	    	        $scrolltop
	    	            .addClass("btn-show")
	    	            .removeClass("btn-hide");
	    	    } else {
	    	        $scrolltop
	    	            .addClass("btn-hide")
	    	            .removeClass("btn-show");
	    	    }
	    	});

	    	var $selectorAnchor = $("a[href='#top']");
	    	$selectorAnchor.on("click", function() {
	    	    $("html, body").animate({
	    	        scrollTop: 0
	    	    }, "normal");
	    	    return false;
	    	});
		},

		/* ---------------------------------------------
		 Confirm Booking
		 --------------------------------------------- */
		confirmBooking: function() {
			function booking_confirm_mail(form) {
				var form = $(form);
				form.submit(function (event) {
					event.preventDefault();
					var serialized_data = $(form).serializeArray();
					for (var key in serialized_data) {
						if( serialized_data[key].name == 'item_url') {
							var item_url = serialized_data[key].value;
						}
						if( serialized_data[key].name == 'customer_name') {
							var customer_name = serialized_data[key].value;
						}
						if( serialized_data[key].name == 'customer_mobile') {
							var customer_mobile = serialized_data[key].value;
						}
						if( serialized_data[key].name == 'customer_email') {
							var customer_email = serialized_data[key].value;
						}
						if( serialized_data[key].name == 'customer_member') {
							var customer_member = serialized_data[key].value;
						}
						if( serialized_data[key].name == 'customer_children') {
							var customer_children = serialized_data[key].value;
						}
						if( serialized_data[key].name == 'customer_message') {
							var customer_message = serialized_data[key].value;
						}
					}
					$.ajax({
						type: "POST",
						dataType: "html",
						url: houserent.ajaxurl,
						data: {
							action: 'houserent_theme_send_booking',
							item_url : item_url,
							customer_name : customer_name,
							customer_mobile : customer_mobile,
							customer_email : customer_email,
							customer_member : customer_member,
							customer_children : customer_children,
							customer_message : customer_message,
						},
						success: function () {	
							var $modalSccess = 	$(".modal-success");			
							$modalSccess.fadeIn();
						},
						error: function () {
							var $modalError = $(".booking-request-status .modal-error");
							$modalError.fadeTo("slow", 0, function () {
								$modalError.fadeIn();
							});
						}
					});
				});  
			}
			var $bookingConfirmId = $("#booking-confirm-form");
			if ($bookingConfirmId.length) {
				booking_confirm_mail($bookingConfirmId.selector);
			}

			var $bookingSuccessMessege = $(".booking-request-status button.btn-success");
			$bookingSuccessMessege.on('click', function(){ 
				var $bookingSelf = $(this);
				$bookingSelf.parent().parent().parent().parent().fadeOut();
				window.location.href = $houserent.home_url+"rental/"; 
			});			

			var $bookingErrorMessege = $(".booking-request-status button.btn-danger"); 
			$bookingErrorMessege.on('click',function(){
				var $errorSelf = $(this);
				var $redirectUrl = $("#item-cancel-button");
				$errorSelf.parent().parent().parent().parent().fadeOut();
				var itemUrlc = $redirectUrl.attr('href');
				window.location.href = itemUrlc; 
			});

			// Booking Form Validation
			var $bookingFormSelector = $(".advance_search_query.booking-form");
			$bookingFormSelector.validate({
			    rules: {
			        full_name: "required",
			        phone_number: "required",
			        email: {
			            required: true,
			            email: true
			        },
			        message: {
			            required: true,
			            minlength: 50
			        }
			    },
			    messages: {
			        full_name: $houserent.form_validator_name,
			        phone_number: $houserent.form_validator_mobile,
			        message: {
			            required: $houserent.form_validator_message,
			            minlength: $houserent.form_validator_pass
			        },
			        email: $houserent.form_validator_email
			    },
			    submitHandler: function(form) {
			        form.submit();
			    }
			});
		},

		/* ---------------------------------------------
		 Post Share
		 --------------------------------------------- */
		postShare: function() {
			function windowPopup(url, width, height) {
			    var left = (screen.width / 2) - (width / 2),
			        top = (screen.height / 2) - (height / 2);

			    window.open(
			        url, "",
			        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
			    );
			}
			var $shareSelector = $(".customer.share");
			$shareSelector.on("click", function(e) {
				e.preventDefault();
			   	windowPopup($(this).attr("href"), 500, 300);
			});
		},
		/* ---------------------------------------------
		 Masonry Active
		 --------------------------------------------- */
		 masonry: function() {
		 	var $container = $('.catagory-right-content ');
		 	$container.imagesLoaded(function () {
		 	    $container.masonry({
		 	        itemSelector: '.category-list.style-two'
		 	    });
		 	});

		 	/* date picker */
		 	$(".datepicker.check-in").datepicker({
		 	    showOn: "both",
		 	    buttonText: "<i class='fa fa-calendar'></i>",
		 	    minDate: 0,
		 	    dateFormat: 'yy-mm-dd',
		 	    beforeShow: function(input, inst) {
		 	        $('#ui-datepicker-div').addClass($(input).data('theme'));
		 	    },

		 	    onClose: function( selectedDate ) {
		 	        $(".datepicker.check-out").datepicker( "option", "minDate", selectedDate );
		 	    }
		 	});

		 	$(".datepicker.check-out").datepicker({
		 	    showOn: "both",
		 	    buttonText: "<i class='fa fa-calendar'></i>",
		 	    minDate: 0,
		 	    dateFormat: 'yy-mm-dd',
		 	    beforeShow: function(input, inst) {
		 	        $('#ui-datepicker-div').addClass($(input).data('theme'));
		 	    },
		 	    onClose: function( selectedDate ) {
		 	        $(".datepicker.check-in").datepicker( "option", "maxDate", selectedDate );
		 	    }
		 	});

		 },


		/* ---------------------------------------------
		 function initializ
		 --------------------------------------------- */
		initializ: function() {
			modelApp.ajax();
			modelApp.auto_complate();
			modelApp.menu();
			modelApp.popup_window();
			modelApp.header_overlay();
			modelApp.gallary();
			modelApp.category();
			modelApp.testimonial();
			modelApp.gallery();
			modelApp.count();
			modelApp.category_seven();
			modelApp.time_count();
			modelApp.widget_mobile();
			modelApp.ipad_parallax();
			modelApp.confirmBooking();
			modelApp.brand();
			modelApp.mobileSelect();
			modelApp.pogoSlider();
			modelApp.othersFunction();
			modelApp.scroll_top();
			modelApp.postShare();
			modelApp.masonry();
		}
	};
	/* ---------------------------------------------
	 Document ready function
	 --------------------------------------------- */
	$(function() {
		modelApp.initializ();
	});
	
})(jQuery);