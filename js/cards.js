/**
 * Cards
 *
 * @version 0.0.0
 * @author  Jeff Turcotte <jeff@imarc.com>
 */

var cards = function(selector) {
    var stickIndex = 0;
    var activeOpacity = 0;
    var container = document.querySelector(selector);
    var cards = [].slice.call(container.children);

    var initializeZIndex = function() {
        var zIndex = 1;

        for (var i = cards.length - 1; i >= 0; i--) {
            cards[i].style.zIndex = zIndex++;
        }
    };

	var stickCards = function() {
        var stuckCards = cards.slice(stickIndex);
		for(var i = 0; i < stuckCards.length; i++) {
			stuckCards[i].style.position = 'fixed';
			stuckCards[i].style.top = '1px';
			stuckCards[i].style.opacity = i === 0 ? activeOpacity : 0;
		}
	};

	var unstickCards = function() {
        var fluidCards = cards.slice(0, stickIndex);
		for(var i = 0; i < fluidCards.length; i++) {
			fluidCards[i].style.opacity = 1;
			fluidCards[i].style.position = 'absolute';
			fluidCards[i].style.top = (i * 100) + 'vh';
		}
	};

    var updateCards = function() {
        var scroll = (window.pageYOffset - container.offsetTop) / window.innerHeight;
        stickIndex = Math.abs(Math.floor(scroll)) + 1;
        activeOpacity = scroll % 1;

        unstickCards();
        stickCards();

        window.requestAnimationFrame(updateCards);
    };

    initializeZIndex();
    stickCards(cards);
    container.style.height = (cards.length * 100)  + 'vh';
    window.requestAnimationFrame(updateCards);
};
