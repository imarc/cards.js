/**
 *
 * jQuery Cards
 *
 *Version: 0.0.0
 *Author: Jeff Turcotte <jeff@imarc.com>, Tommy Chanthaboune <tommy@imarc.com>
 */

(function ($) {
	$.fn.cards = function (options) {
		var plugin = this;

		this.defaults = {};

		this.settings = $.extend({}, plugin.defaults, options);

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

		var unStickCards = function(cards) {
			for(var i = 0; i < cards.length; i++) {
				cards[i].style.opacity = 1;
				cards[i].style.position = 'absolute';
				cards[i].style.top = (i * 100) + 'vh';
			}
		};

		return this.each(function () {
			var container = this;
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

				unStickCards(fluidCards);
				stickCards(stuckCards, activeOffset);

				window.requestAnimationFrame(self);
			});

		});
	};

})(jQuery);

