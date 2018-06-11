$(function() {
	// Handler for .ready() called.
	/*** Desktop navigation ***/

	//rollover navigation
	if (window.matchMedia('(min-width: 1018px)').matches) {
		$('.nav-item').hover(
			function() {
				$(this).addClass('submenu-open');
				$(this)
					.find('.submenu')
					.addClass('open');
			},
			function() {
				$(this).removeClass('submenu-open');
				$(this)
					.find('.submenu')
					.removeClass('open');
			}
		);
	}

	/*** mobile navigation ***/

	$('[data-toggle="offcanvas"]').on('click', function() {
		$('.offcanvas-collapse').toggleClass('open');
	});

	//open submenu first level
	$('[data-action="toggle-primaryMenu"]').click(function() {
		var currentActiveNav = $(this).prev();
		var currentSubmenu = $(this).next();
		if (!currentActiveNav.hasClass('active')) {
			currentActiveNav.addClass('active');
			$(this).addClass('opened');
			currentSubmenu.slideDown('slow');
			var siblingsToClose = $(this)
				.closest('.nav-item')
				.siblings()
				.find('.submenu');
			siblingsToClose.slideUp('slow');
			$(this)
				.closest('.nav-item')
				.siblings()
				.find('.open-menu')
				.removeClass('opened');
			$(this)
				.closest('.nav-item')
				.siblings()
				.find('.nav-link')
				.removeClass('active');
		} else {
			currentSubmenu.slideUp('slow');
			currentActiveNav.removeClass('active');
			$(this).removeClass('opened');
		}
	});
	//open submenu second level

	$('[data-action="toggle-secondaryMenu"]').click(function() {
		var currentActiveNav = $(this).prev();
		var currentSubmenu = $(this).next();
		if (!currentActiveNav.hasClass('active')) {
			currentSubmenu.slideDown('slow');
			currentActiveNav.addClass('active');
			$(this).addClass('opened');
			var siblingsToClose = $(this)
				.closest('ul')
				.siblings()
				.find('.secondaryMenu');
			siblingsToClose.slideUp('slow', function() {
				$(this)
					.siblings('.category-title')
					.removeClass('active');
			});
			$(this)
				.closest('ul')
				.siblings()
				.find('.open-submenu')
				.removeClass('opened');
		} else {
			currentSubmenu.slideUp('slow');
			currentActiveNav.removeClass('active');
			$(this).removeClass('opened');
		}
	});

	/******  Hamburgers *****/

	//polyfill foreach
	var forEach = function(t, o, r) {
		if ('[object Object]' === Object.prototype.toString.call(t))
			for (var c in t)
				Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
		else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
	};

	//hamburger
	var hamburgers = document.querySelectorAll('.hamburger');
	if (hamburgers.length > 0) {
		forEach(hamburgers, function(hamburger) {
			hamburger.addEventListener(
				'click',
				function() {
					this.classList.toggle('is-active');
					$('body').toggleClass('no-scroll');
				},
				false
			);
		});
		document.querySelectorAll('.hamburger');
	}
});

$(function() {
	/***** number spinner for input=number *******/
	//$('#spinner').spinner();

	/***** lightbox/Featherlight gallery *******/
	$('a.gallery').featherlightGallery({
		previousIcon: '<i class="fa fa-angle-left"></i>',
		nextIcon: '<i class="fa fa-angle-right"></i>',
		galleryFadeIn: 100,
		galleryFadeOut: 300
	});

	var sync1 = $('.sync1');
	var sync2 = $('.sync2');
	var slidesPerPage = 4; //globaly define number of elements per page
	var syncedSecondary = true;

	sync1
		.owlCarousel({
			items: 1,
			slideSpeed: 2000,
			nav: true,
			autoplay: true,
			dots: true,
			loop: true,
			responsiveRefreshRate: 200,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>'
			]
		})
		.on('changed.owl.carousel', syncPosition);

	sync2
		.on('initialized.owl.carousel', function() {
			sync2
				.find('.owl-item')
				.eq(0)
				.addClass('current');
		})
		.owlCarousel({
			items: slidesPerPage,
			dots: false,
			nav: true,
			navText: [
				'<i class="fa fa-angle-left"></i>',
				'<i class="fa fa-angle-right"></i>'
			],

			smartSpeed: 200,
			slideSpeed: 500,
			slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
			responsiveRefreshRate: 100
		})
		.on('changed.owl.carousel', syncPosition2);

	function syncPosition(el) {
		//if you set loop to false, you have to restore this next line
		//var current = el.item.index;

		//if you disable loop you have to comment this block
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}

		//end block

		sync2
			.find('.owl-item')
			.removeClass('current')
			.eq(current)
			.addClass('current');
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2
			.find('.owl-item.active')
			.first()
			.index();
		var end = sync2
			.find('.owl-item.active')
			.last()
			.index();

		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl.carousel').to(number, 100, true);
		}
	}

	sync2.on('click', '.owl-item', function(e) {
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});

	$('.addAmountToCart ').hover(
		function() {
			$('.number-arrows').hide();
		},
		function() {
			$('.number-arrows').show();
		}
	);
});

$(function() {
	// Handler for .ready() called.

	function eqColumns(element) {
		var height = '0';
		$(element).each(function() {
			$(this).css({
				height: 'auto'
			});
			if ($(this).outerHeight() > height) {
				height = $(this).outerHeight();
			}
		});
		$(element).each(function() {
			$(this).css({
				height: height
			});
		});
	}

	function equalizeTeaserBoxes() {
		var height = $('.teaserbox').height();
		$('.et-wrapper').css({
			height: height
		});
	}

	function equalizeTableColumns() {
		var width = $('#comparelist thead th').width();
	}
	//adding movie in carousel makes page jumpy
	function resizeCarousel() {
		var carouselMaxHeight = $('.carousel-item').height();
		$('.carousel-inner').css('max-height', carouselMaxHeight);
	}

	//call the functions
	resizeCarousel();
	equalizeTeaserBoxes();
	equalizeTableColumns();
	if (window.matchMedia('(min-width: 1018px)').matches) {
		eqColumns('.product h3');
	}

	$(window).resize(function() {
		equalizeTeaserBoxes();
		resizeCarousel();
		equalizeTableColumns();
		eqColumns('.product h3');
	});
});

$(function() {
	$('[data-toggle="tooltip"]').tooltip();

	$('.display-search')
		.parent()
		.css('display', 'none');

	var desktopState = '(min-width: 1018px)';
	var mobileState = '(max-width: 1018px)';

	ssm.addState({
		id: 'desktop',
		query: desktopState,
		onEnter: function() {
			$('.submenu').removeAttr('style');
			$('.category-title')
				.next('ul')
				.removeAttr('style');
			//	$('.nav-link').removeClass('active');
			$('.category-title').removeClass('active');
			$('.icon').removeClass('opened');
		}
	});
});

// get base url
function getBaseUrl() {
	var b = '';

	// protocol
	b += document.location.protocol;
	b += '//';

	// host
	b += document.location.host;
	b += '/';

	return b;
}

$(function() {
	/**** set intervall for ticker ***/
	var myTicker;

	function startTicker() {
		myTicker = setInterval(function() {
			$('.et-page').trigger('click');
		}, 4000);
	}
	startTicker();

	$('.et-wrapper').hover(
		function() {
			/* Stuff to do when the mouse enters the element */
			clearInterval(myTicker);
		},
		function() {
			/* Stuff to do when the mouse leaves the element */
			startTicker();
		}
	);

});
$(function() {
	//scrollToTOp
	$('#scrollToTop').click(function(event) {
		event.preventDefault();
		$('html, body').animate(
			{
				scrollTop: 0
			},
			'slow',
			'linear',
			function() {
				$('#scrollToTop').fadeOut('400', function() {});
			}
		);
	});

	$(document).on('scroll', function() {
		if ($(document).scrollTop() >= 110) {
			$('#scrollToTop').fadeIn(400, function() {});
		}
		if ($(document).scrollTop() === 0) {
			$('#scrollToTop').fadeOut(400, function() {});
		}
	});

	/* Hide searchbar and menu icons on scroll */
	if (window.matchMedia('(max-width: 1018px)').matches) {
		var searchBarActive = true;
		var searchButtonClicked = false;

		$(window).scroll(function() {
			if ($(window).scrollTop() > 200) {
				//$('.navbar').addClass('shadow');
				$('.display-search')
					.closest('li')
					.show();
				$('.scroll').addClass('hidden');
				$('.navbar').css('height', '60px');
				$('.display-search').removeClass('active');
				searchBarActive = false;
			} else {
				//  $('.navbar').removeClass('shadow');
				$('.scroll').removeClass('hidden');
				$('.display-search')
					.closest('li')
					.hide();
				$('.navbar').removeAttr('style');
				searchBarActive = true;
			}
		});

		/* show the scrollbar on click*/
		function toggleSearchBar() {
			if (searchBarActive === true) {
				$('.scroll').addClass('hidden');
				$('.display-search').removeClass('active');
				$('.navbar').css('height', '60px');
				searchBarActive = false;
			} else {
				$('.scroll').removeClass('hidden');
				$('.display-search').addClass('active');
				$('.navbar').css('height', '120px');
				searchBarActive = true;
			}
		}

		$('.display-search').click(function(event) {
			event.preventDefault();
			toggleSearchBar();
		});
	} //match.media
});


$('#close-lightbox').click(function(event) {
	$('.lightbox').removeClass('open');
	$('body').removeClass('no-scroll');
});

$('#open-comparelist').click(function(event) {
	$('.lightbox').addClass('open');
	$('.lightbox').show();
	$('body').addClass('no-scroll');
	var lighboxHeight = $('.lightbox').height();
});

$(function() {
	function autoMergeByCol() {
		if(document.getElementById('comparelist')){
			var rowStartIndex = 1,
				colStart = 1,
				colEnd = document.getElementById('comparelist').rows[colStart].cells.length;

			var tableRowArray = $('#comparelist tr'); // rows array
			for (
				var rowIndex = rowStartIndex;
				rowIndex < tableRowArray.length;
				rowIndex++
			) {
				var tableCellArray = $(tableRowArray[rowIndex]).find('td'); // cols array of the row
				if (colEnd < 0) colEnd = tableCellArray.length - 1; // if colEnd is negative, process at the end of the cols;
				for (
					var columnIndex = colStart;
					columnIndex < tableCellArray.length && columnIndex <= colEnd;
					columnIndex++
				) {
					var span = 1;
					var currentTableCell = $(tableCellArray)[columnIndex];
					if ($(currentTableCell).attr('rowspan')) {
						continue;
					}
					var nextTableCell = $(
						$(currentTableCell)
							.parent()
							.children()[columnIndex + span]
					);
					while (
						nextTableCell != undefined &&
						$(currentTableCell).text() == $(nextTableCell).text() &&
						columnIndex + span <= colEnd
					) {
						span++;
						nextTableCell.hide();
						nextTableCell = $(
							$(nextTableCell)
								.parent()
								.children()[columnIndex + span]
						);
					}
					if (span > 1) {
						$(currentTableCell).attr('colspan', span);
					}
				}
			}
		}
	}

	//call the function
	autoMergeByCol();

	function removeColspans() {
		$('td').each(function(index, el) {
			$(this).removeAttr('colspan style');
		});
	}

	$('.handle').mousedown(function() {
		removeColspans();
	});

	$('.handle').mouseup(function() {
		autoMergeByCol();
	});
});

$(document).ready(function() {
	if($('#comparelist').length > 0){
		var table = $('#comparelist').DataTable({
			colReorder: {
				fixedColumnsLeft: 1
			},
			searching: false,
			lengthChange: false,
			paging: false,
			scrollCollapse: true,
			bInfo: false
		});
	}
});

$(document).ready(function() {
	if ($('#comparelist').length > 0) {
		var rowLength;
		$('tr').each(function(index, el) {
			rowLength = $(this).children('td').length;
			rowLength = rowLength - 1;
		});

		var maxCols = $('td[colspan=' + rowLength + ']').parent();

		var checkBox = document.getElementById('toggleRows');

		checkBox.addEventListener('change', function() {
			if (this.checked) {
				$(maxCols).css('display', 'table-row');
			} else {
				$(maxCols).css('display', 'none');
			}
		});
	}
});

$('select').select2({
	width: null
});

$(document).ready(function() {
	$('.countUp').click(function() {
		var input = $(this).prev('input');
		var currentValue = parseInt(input.val());
		if (currentValue < 0) input.val((currentValue = 0));
		input.val(currentValue + 1);
		initialValue = $(this)
			.parentsUntil('.product-title')
			.find('.price')
			.val();
	});
	$('.countDown').click(function() {
		var input = $(this).next('input');
		var currentValue = parseInt(input.val());
		if (currentValue <= 0) {
			input.val((currentValue = 0));
		} else {
			input.val(currentValue - 1);
		}
	});
});

$(function() {
	var inputWidth;
	function customInputWidth() {
		inputWidth = $('#drowpdown-delivery-address')
			.parents('.input-group')
			.width();
		inputWidth = inputWidth - 2;
		$('.dropdown-menu').width(inputWidth);
	}
	customInputWidth();
	$(window).resize(function(e) {
		customInputWidth();
	});

	$('.dropdown-menu').width(inputWidth);

	$('.show-inactive').on('click', function(e) {
		e.stopImmediatePropagation();
		if ($(this).hasClass('in')) {
			$(this)
				.siblings('.inactive')
				.hide();
			$(this).text('inaktive anzeigen');
			$(this).removeClass('in');
		} else {
			$(this)
				.siblings('.inactive')
				.show();
			$(this).addClass('in');
			$(this).text('inaktive ausblenden');
		}
	});

	$('.address-item').on('click', function(e) {
		var selectedAddress = $(this)
			.find('.address-title')
			.text();
		$('#delivery-address').val(selectedAddress);
	});

	$('.payment-option').on('click', function(e) {
		var selectedOption = $(this).text();

		selectedOption = selectedOption.trim();
		console.log(selectedOption);
		$('#payment-method').val(selectedOption);
	});
});
