;(function(win) {

	'use strict';

	var helpers = win.helpers = {

		loadCSS: function(href, callback) {

			var link = win.document.createElement('link');

			document.querySelector('head').appendChild(link);

			link.setAttribute('rel', 'stylesheet');
			link.addEventListener('load', callback, false);
			link.addEventListener('error', callback, false);
			link.setAttribute('href', href + '.css');

		}

	};


}(this));
