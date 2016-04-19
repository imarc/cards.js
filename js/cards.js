/**
 * Cards
 *
 * @version 0.0.0
 * @author  Jeff Turcotte <jeff@imarc.com>
 */

var cards = function(selector) {
    var startSticking = 0;
    var activeOpacity = 0;
    var container = document.querySelector(selector);
    var cards = [].slice.call(container.children);

    var initializeZIndex = function() {
        var zIndex = 1;

        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].style.zIndex = zIndex++;
        }
    };

	var unstickCards = function() {
		for(var i = 0; i < startSticking; i++) {
			cards[i].style.opacity = 1;
			cards[i].style.position = 'absolute';
			cards[i].style.top = (i * 100) + 'vh';
		}
	};

	var stickCards = function() {
		for(var i = startSticking; i < cards.length; i++) {
			cards[i].style.position = 'fixed';
			cards[i].style.top = '1px';
			cards[i].style.opacity = i === startSticking ? activeOpacity : 0;
		}
	};

    var updateCards = function() {
        var scroll = (window.pageYOffset - container.offsetTop) / window.innerHeight;
        startSticking = Math.max(0, Math.floor(scroll) + 1);
        activeOpacity = scroll % 1;

        unstickCards();
        stickCards();

        window.requestAnimationFrame(updateCards);
    };

    initializeZIndex();
    container.style.height = (cards.length * 100)  + 'vh';
    window.requestAnimationFrame(updateCards);
};
