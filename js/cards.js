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
		for(var i = stickIndex; i < cards.length; i++) {
			cards[i].style.position = 'fixed';
			cards[i].style.top = '1px';
			cards[i].style.opacity = i === stickIndex ? activeOpacity : 0;
		}
	};

	var unstickCards = function() {
		for(var i = 0; i < stickIndex; i++) {
			cards[i].style.opacity = 1;
			cards[i].style.position = 'absolute';
			cards[i].style.top = (i * 100) + 'vh';
		}
	};

    var updateCards = function() {
        var scroll = (window.pageYOffset - container.offsetTop) / window.innerHeight;
        console.log(scroll);
        stickIndex = Math.max(0, Math.floor(scroll) + 1);
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
