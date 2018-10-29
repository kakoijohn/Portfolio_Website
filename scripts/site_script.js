$(document).ready(function() {
	var viewportHeight = $(window).height();
	var viewportWidth = $(window).width();

	var textScrollSpeed = 0.1;



	$(window).resize(function() { //when the window is resized, recalculate window height
		viewportHeight = $(window).height();
		viewportWidth = $(window).width();
	});

	var numAnimBlocks = $('.anim_block').size();
	var blockArr = [];
	for (var i = 0; i < numAnimBlocks; i++) {
		blockArr[i] =  {height: $('#anim_' + i).height(), 
						heading: $('#anim_' + i + ' .heading_block h1').html(), 
						text: $('#anim_' + i + ' .heading_block p').html()};
		// console.log($('#anim_' + i).height());
	}

	var numSlideInContainers = $('.slide_in_anim .container').size();

	//initialize the animation for the main heading
	mainHeadingAnimation(0.15);
	$('#home').click(function() {
		mainHeadingAnimation(0.15);
	});

	$(document).scroll(function() {
		var scrollTop = $(document).scrollTop();

		for (var i = 0; i < numSlideInContainers; i++) {
			if ($('#container_' + i).visible()) {
				$('#container_' + i + ' .text').toggleClass('text_slide_in--active', true);
				$('#container_' + i + ' .opaque_box').toggleClass('box_slide_in--active', true);
			}
		}

		headingAnimation();

		if (scrollTop == 0) {
			$('#arrow_icon_area').toggleClass('arrow-down-icon', true);
			$('#arrow_icon_area').toggleClass('solid-line-icon', false);
		} else if (scrollTop >= 1 && scrollTop <= 10) {
			$('#arrow_icon_area').toggleClass('arrow-down-icon', false);
			$('#arrow_icon_area').toggleClass('solid-line-icon', true);
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
		var id = setInterval(frame, 5);

		function frame() {
			var newHeading = blockArr[0].heading;
			var newText = blockArr[0].text;

			var percentTextVisible = tick * animSpeed;

			if (percentTextVisible <= 100) {
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
				clearInterval(id);

				if ($(document).scrollTop() == 0)
					$('#arrow_icon_area').toggleClass('arrow-down-icon', true);
			}

			tick++;
		}
	}
});