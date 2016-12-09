/**
 * Cards.js provides a 'stacked cards' effect where, on scroll, each cards is
 * sequentially scrolled off the top of the stack.
 *
 * @version 0.0.1
 * @author  Jeff Turcotte <jeff@imarc.com>
 */

var cards = function(selector) {
    var startSticking = 0;
    var activeOpacity = 0;
    var container = document.querySelector(selector);
    var cards = [].slice.call(container.children);

    /**
     * Initializes cards z-indexes so that the first card has the highest
     * z-index and it decreases for each subsequent card.
     */
    var initializeZIndex = function() {
        var zIndex = 1;

        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].style.zIndex = zIndex++;
        }
    };

    /**
     * Updates all cards before startSticking to be unstuck.
     */
	var unstickCards = function() {
		for(var i = 0; i < startSticking; i++) {
			cards[i].style.opacity = 1;
			cards[i].style.position = 'absolute';
			cards[i].style.top = (i * 100) + 'vh';
		}
	};

    /**
     * Updates all cards starting at startIndex to be stuck.
     */
	var stickCards = function() {
		for(var i = startSticking; i < cards.length; i++) {
			cards[i].style.position = 'fixed';
			cards[i].style.top = 0;
			cards[i].style.opacity = i === startSticking ? activeOpacity : 0;
		}
	};

    /**
     * This function is called endlessly (via requestAnimationFrame) and
     * updates which cards should be stuck as well as the opacity of the active
     * card based on the current scroll position and window.innerHeight.
     */
    var updateCards = function() {
        var scroll = (window.pageYOffset - container.offsetTop) / window.innerHeight;
        startSticking = Math.max(1, Math.floor(scroll) + 1);
        activeOpacity = scroll % 1;

        unstickCards();
        stickCards();

        window.requestAnimationFrame(updateCards);
    };

    /**
     * Initialization
     */
    initializeZIndex();
    container.style.height = (cards.length * 100)  + 'vh';
    window.requestAnimationFrame(updateCards);
};
