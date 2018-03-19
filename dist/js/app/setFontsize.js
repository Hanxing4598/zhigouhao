;(function(designWidth, maxWidth) {
	var doc = document,
		win = window;
	var docEl = doc.documentElement;
	var tid;
	var rootItem,rootStyle;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;
		if (!maxWidth) {
			maxWidth = 540;
		};
		if (width > maxWidth) {
			width = maxWidth;
		}
		if (width < 320) {
			width = 320;
		}
		
		var rem = width * 100 / designWidth;
		docEl.style.fontSize = rem + "px";
	};
	refreshRem();

	win.addEventListener("resize", function() {
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);

})(750, undefined);