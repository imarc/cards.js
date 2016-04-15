var cards = (function(obj) {
	function getScrollRoot(){
		var offset = document.body.scrollTop;
		document.body.scrollTop = offset + 1;

		if (document.body.scrollTop === 0) {
			document.body.scrollTop = offset;
			return document.documentElement;
		}

		return document.body;
	}

	var body = getScrollRoot();

	var stickCards = function(cards, offset) {
		for(var i = 0; i < cards.length; i++) {
			cards[i].style.position = 'fixed';
			cards[i].style.top = '1px';
			cards[i].style.opacity = i === 0 ? offset: 0;
		}
	};

	var unstickCards = function(cards) {
		for(var i = 0; i < cards.length; i++) {
			cards[i].style.opacity = 1;
			cards[i].style.position = 'absolute';
			cards[i].style.top = (i * 100) + 'vh';
		}
	};

	obj.init = function(selector) {
		var container = document.querySelector(selector);
		var cards = [].slice.call(container.children);
		var zIndex = 1;

		for (var i = cards.length-1 ; i >= 0; i--) {
			cards[i].style.zIndex = zIndex++;
		}

		stickCards(cards);
		container.style.height = (cards.length * 100)  + 'vh';

		window.requestAnimationFrame(function self() {
			var scroll = (body.scrollTop - container.offsetTop) / window.innerHeight;
			var activeIndex = Math.abs(Math.floor(scroll));
			var activeOffset = scroll % 1;
			var fluidCards = cards.slice(0, activeIndex + 1);
			var stuckCards = cards.slice(activeIndex + 1);

			unstickCards(fluidCards);
			stickCards(stuckCards, activeOffset);

			window.requestAnimationFrame(self);
		});
	};

	return obj;
})({} || cards);
