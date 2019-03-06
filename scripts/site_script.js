$(document).ready(function() {
	var viewportHeight = $(window).height();
	var viewportWidth = $(window).width();

	var portraitOrientation;
	if (viewportHeight >= viewportWidth)
		portraitOrientation = true;
	else
		portraitOrientation = false;

	$(window).resize(function() { //when the window is resized, recalculate window height
		viewportHeight = $(window).height();
		viewportWidth = $(window).width();

		if (viewportHeight >= viewportWidth)
			portraitOrientation = true;
		else
			portraitOrientation = false;
	});



	$("#home_button").click(function() {
	    $([document.documentElement, document.body]).animate({
	        scrollTop: 0
	    }, 2000);
	});

	$("#arrow_icon_area").click(function() {
		if (!portraitOrientation) {
	    	$([document.documentElement, document.body]).animate({
	    	    scrollTop: $("#globe_frame").offset().top - 50
	    	}, 3000);
	    } else {
	    	$([document.documentElement, document.body]).animate({
	    	    scrollTop: $("#globe_frame").offset().top - 600
	    	}, 3000);
	    }
	});

	$("#works_button").click(function() {
		if (!portraitOrientation) {
			$([document.documentElement, document.body]).animate({
			    scrollTop: $("#ANPS_website_image").offset().top - 100
			}, 2000);
		} else {
			$([document.documentElement, document.body]).animate({
			    scrollTop: $("#ANPS_website_image").offset().top - 600
			}, 2000);
		}
	});

	$("#contact_button").click(function() {
	    $([document.documentElement, document.body]).animate({
	        scrollTop: $("#mountain").offset().top
	    }, 2000);
	});

	//cancel scroll animation if user inputs
	$([document.documentElement, document.body]).on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
		$([document.documentElement, document.body]).stop();
	});


	//setup variables for the headings
	var textScrollSpeed = 0.1;

	var numAnimBlocks = $('.anim_block').size();
	var blockArr = [];
	for (var i = 0; i < numAnimBlocks; i++) {
		blockArr[i] =  {height: $('#anim_' + i).height(), 
						heading: $('#anim_' + i + ' .heading_block h1').html(), 
						text: $('#anim_' + i + ' .heading_block p').html()};
	}
	var numSlideInContainers = $('.slide_in_anim .container').size();


	var numCodeFrames = $('#code_frame .text li').size();
		var codeFrameSpeeds = [];
		for (var i = 0; i < numCodeFrames; i++)
			codeFrameSpeeds[i] = Math.random() * 2 + 1;


	//initialize the animation for the main heading
	var mainHeadingAnimationRunning = false;
	var mainHeadingAnimationCancel = false;
	mainHeadingAnimation(0.15);
	$('#home').click(function() {
		if (mainHeadingAnimationRunning)
			mainHeadingAnimationCancel = true;
		mainHeadingAnimation(0.15);
	});

	var atbottom = false;
	$(document).scroll(function() {

		var scrollTop = $(document).scrollTop();
		var distFromPageBottom = $(document).height() - scrollTop - $(window).height();

		for (var i = 0; i < numSlideInContainers; i++) {
			if ($('#container_' + i).visible()) {
				$('#container_' + i + ' .text').toggleClass('text_slide_in--active', true);
				$('#container_' + i + ' .opaque_box').toggleClass('box_slide_in--active', true);
			}
		}

		headingAnimation();

		var activeBlock = getCurrentActiveBlock();
		var scrollPercent = activeBlock.distFromTop / activeBlock.blockHeight;
		
		if (scrollTop == 0) {
			$('#arrow_icon_area').toggleClass('arrow-down-icon', true);
			$('#arrow_icon_area').toggleClass('solid-line-icon', false);

			$('#arrow_icon_area').removeAttr('style');
		} else if (activeBlock.blockIndex == 0 && scrollPercent > 0) {
			$('#arrow_icon_area').removeAttr('style');
			$('#arrow_icon_area').toggleClass('arrow-down-icon', false);
			$('#arrow_icon_area').toggleClass('solid-line-icon', true);

			$('#arrow_icon_area').css('height', (100 * scrollPercent) + '%');
		}

		if (activeBlock.blockIndex == 1 && scrollPercent > 0) {
			$('#arrow_icon_area').css('height', '100%');
			$('#arrow_icon_area').css('left', (100 * scrollPercent * 1.5) + '%');
		}

		if (activeBlock.blockIndex == 2 && scrollPercent > 0) {
			$('#code_frame').css('display', 'block');

			var codeFrameListItems = $('#code_frame .text li');
			var i = 0;
			codeFrameListItems.each(function(idx, li) {
				$(li).css('top', ((200 * (scrollPercent * 2) * codeFrameSpeeds[i]) - 200) + 'vh');
				i++;
				
				var codeText = $(li).html();

				var chance = 30; //% chance
				var randomChance = Math.floor(Math.random() * 100);
				if (randomChance <= chance) {
					var firstIndex  = Math.floor(Math.random() * codeText.length);
					var secondIndex = Math.floor(Math.random() * codeText.length);

					var firstChar  = codeText.charAt(firstIndex);
					var secondChar = codeText.charAt(secondIndex);

					codeText = codeText.substring(0, firstIndex) + secondChar + codeText.substring(firstIndex + 1);
					codeText = codeText.substring(0, secondIndex) + firstChar + codeText.substring(secondIndex + 1);
				}

				$(li).html(codeText);
			});
		} else {
			$('#code_frame').css('display', 'none');
		}

		if (activeBlock.blockIndex == 4) {
			$('#starfield').css('opacity', 1);
			$('#starfield2').css('opacity', 1);

			$('.contact_area').css('display', 'block');

			if (distFromPageBottom < $(window).height() * 2.0)
				$('#contact_name').css('opacity', 1);
			else
				$('#contact_name').css('opacity', 0);

			if (distFromPageBottom < $(window).height() * 1.5)
				$('#email').css('opacity', 1);
			else
				$('#email').css('opacity', 0);

			if (distFromPageBottom < $(window).height() * 1.0)
				$('#phone').css('opacity', 1);
			else
				$('#phone').css('opacity', 0);

			if (distFromPageBottom < $(window).height() * .75)
				$('#linkedin').css('opacity', 1);
			else
				$('#linkedin').css('opacity', 0);

			if (distFromPageBottom < $(window).height() * .5)
				$('#resume').css('opacity', 1);
			else
				$('#resume').css('opacity', 0);
		} else {
			$('#starfield').css('opacity', 0);
			$('#starfield2').css('opacity', 0);

			$('.contact_area').css('display', 'none');
		}


		if(scrollTop + $(window).height() + 200 >= $(document).height()) {
			$('#lander').css('animation', 'lander_landing 10s forwards');
			$('#lander').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
				$('#lander .burner').css('opacity', '0');
			});
		}

	});

	function headingAnimation() {
		var activeBlock = getCurrentActiveBlock();

		var textScrollInPercent = activeBlock.distFromTop * textScrollSpeed;
		var textScrollOutPercent = (activeBlock.blockHeight - activeBlock.distFromTop) * textScrollSpeed;
		
		var textScrollPercent;

		if (textScrollInPercent > 100 && textScrollOutPercent > 100)
			textScrollPercent = 0;
		else if (textScrollInPercent < 100)
			textScrollPercent = 100 - textScrollInPercent;
		else if (textScrollOutPercent < 100)
			textScrollPercent = textScrollOutPercent - 100;

		//special case for first element, dont cause scroll up effect
		if (activeBlock.blockIndex == 0)
			textScrollPercent = -textScrollInPercent;

		$('#anim_' + activeBlock.blockIndex + ' .heading_block').css({'transform': 'translateY(' + textScrollPercent + '%)'});

		//make all but current block visible
		makeCurrentActiveVisible(activeBlock.blockIndex);

		//text effects from scrolling
		var newHeading = blockArr[activeBlock.blockIndex].heading;
		var newText = blockArr[activeBlock.blockIndex].text;

		if (textScrollPercent > 0) {
			//scrolling up
			var percentTextVisible = 100 - textScrollPercent;
			if (percentTextVisible >= 0 && percentTextVisible <= 100) {
				var numHeadingCharsVisible = parseInt(newHeading.length * (percentTextVisible / 100));
				var numTextCharsVisible = parseInt(newText.length * (percentTextVisible / 100));

				var newHeadingChars = newHeading.substring(0, numHeadingCharsVisible);
				var newHeadingWhiteSpace = "<span style=\"color: transparent\">" + newHeading.substring(numHeadingCharsVisible, newHeading.length) + "</span>";
				newHeading = newHeadingChars + newHeadingWhiteSpace;

				$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').html(newHeading);

				var newTextChars = newText.substring(0, numTextCharsVisible);
				var newTextWhiteSpace = "<span style=\"color: transparent\">" + newText.substring(numTextCharsVisible, newText.length) + "</span>";
				newText = newTextChars + newTextWhiteSpace;

				$('#anim_' + activeBlock.blockIndex + ' .heading_block p').html(newText);
			} else {
				$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').html("");
				$('#anim_' + activeBlock.blockIndex + ' .heading_block p').html("");
			}

			//make animation for text distortion active
			$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').toggleClass('text_distortion_anim--active', true);
			$('#anim_' + activeBlock.blockIndex + ' .heading_block p').toggleClass('text_distortion_anim--active', true);
		} else if (textScrollPercent < 0) {
			//scrolling down
			var percentTextVisible = -textScrollPercent;

			if (percentTextVisible >= 0 && percentTextVisible <= 100) {
				var numHeadingCharsVisible = parseInt(newHeading.length * (percentTextVisible / 100));
				var numTextCharsVisible = parseInt(newText.length * (percentTextVisible / 100));

				var newHeadingWhiteSpace = "<span style=\"color: transparent\">" + newHeading.substring(0, numHeadingCharsVisible) + "</span>";
				var newHeadingChars = newHeading.substring(numHeadingCharsVisible, newHeading.length);
				newHeading = newHeadingWhiteSpace + newHeadingChars;

				$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').html(newHeading);

				var newTextWhiteSpace = "<span style=\"color: transparent\">" + newText.substring(0, numTextCharsVisible) + "</span>";
				var newTextChars = newText.substring(numTextCharsVisible, newText.length);
				newText = newTextWhiteSpace + newTextChars;

				$('#anim_' + activeBlock.blockIndex + ' .heading_block p').html(newText);
			} else {
				$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').html("");
				$('#anim_' + activeBlock.blockIndex + ' .heading_block p').html("");
			}

			//make animation for text distortion active
			$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').toggleClass('text_distortion_anim--active', true);
			$('#anim_' + activeBlock.blockIndex + ' .heading_block p').toggleClass('text_distortion_anim--active', true);
		} else if (textScrollPercent == 0) {
			$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').text(newHeading);
			$('#anim_' + activeBlock.blockIndex + ' .heading_block p').text(newText);

			//make animation for text distortion inactive
			$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').toggleClass('text_distortion_anim--active', false);
			$('#anim_' + activeBlock.blockIndex + ' .heading_block p').toggleClass('text_distortion_anim--active', false);
		}

		//if the last text block is active and all the text is on the screen, don't remove it from the screen
		if (textScrollPercent <= 0 && activeBlock.blockIndex == numAnimBlocks - 1) {
			$('#anim_' + activeBlock.blockIndex + ' .heading_block').css({'transform': 'translateY(0%)'});

			$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').text(blockArr[activeBlock.blockIndex].heading);
			$('#anim_' + activeBlock.blockIndex + ' .heading_block p').text(blockArr[activeBlock.blockIndex].text);

			$('#anim_' + activeBlock.blockIndex + ' .heading_block h1').toggleClass('text_distortion_anim--active', false);
			$('#anim_' + activeBlock.blockIndex + ' .heading_block p').toggleClass('text_distortion_anim--active', false);
		}
	}

	function makeCurrentActiveVisible(active) {
		for (var i = 0; i < numAnimBlocks; i++)
			if (i == active)
				$('#anim_' + i + ' .heading_block').toggleClass('heading_block--active', true);
			else
				$('#anim_' + i + ' .heading_block').toggleClass('heading_block--active', false);
	}

	function getCurrentActiveBlock() {
		var scrollTop = $(document).scrollTop();

		var i = 0;
		var blockHeightTot = 0;
		while (blockHeightTot <= scrollTop) {
			blockHeightTot += blockArr[i].height;
			i++;
			if (i >= numAnimBlocks)
				break;
		}

		var distFromTop = scrollTop - (blockHeightTot - blockArr[i - 1].height);
		var blockHeight = blockArr[i - 1].height;
		
		return {blockIndex: (i - 1), distFromTop: distFromTop, blockHeight: blockHeight};
	}

	function mainHeadingAnimation(animSpeed) {
		var tick = 0;
		var id = setInterval(frame, 30);

		function frame() {
			var newHeading = blockArr[0].heading;
			var newText = blockArr[0].text;

			var percentTextVisible = tick;

			if (percentTextVisible <= 100 && mainHeadingAnimationCancel != true) {
				mainHeadingAnimationRunning = true;

				var numCharsVisible = parseInt((newHeading.length + newText.length) * (percentTextVisible / 100));

				if (numCharsVisible <= newHeading.length) {
					var newHeadingChars = newHeading.substring(0, numCharsVisible);
					var newHeadingWhiteSpace = "<span style=\"color: transparent\">" + newHeading.substring(numCharsVisible, newHeading.length) + "</span>";
					newHeading = newHeadingChars + newHeadingWhiteSpace;

					newText = "";
				} else {
					numCharsVisible = numCharsVisible - newHeading.length + 1;

					var newTextChars = newText.substring(0, numCharsVisible);
					var newTextWhiteSpace = "<span style=\"color: transparent\">" + newText.substring(numCharsVisible, newText.length) + "</span>";
					newText = newTextChars + newTextWhiteSpace;			
				}

				$('#anim_0 .heading_block h1').html(newHeading);
				$('#anim_0 .heading_block p').html(newText);
			} else {
				mainHeadingAnimationRunning = false;
				mainHeadingAnimationCancel = false;

				clearInterval(id);

				if ($(document).scrollTop() == 0)
					$('#arrow_icon_area').toggleClass('arrow-down-icon', true);
			}

			tick++;
		}
	}

});