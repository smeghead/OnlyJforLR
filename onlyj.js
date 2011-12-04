// ==UserScript==
// @name           Only j for LivedoorReader
// @description    if not exists next entry, go to next feed.
// @author         @smeghead
// @match          http://reader.livedoor.com/
// @match          http://reader.livedoor.com/*
// @match          https://reader.livedoor.com/
// @match          https://reader.livedoor.com/*
// ==/UserScript==

//割り込み処理
var globalScript = "(" + (function(){
	var eventFunction = function(key, test, alternateKey) {
		var originalFunction = Keybind._keyfunc[key];
		Keybind._keyfunc[key] = function() {
			console.log('OnlyJForLR: pressed keys. ' + key);
			var nextItemOffset = Control[test]();
			originalFunction.apply(this);
			if (nextItemOffset == null) {
				Keybind.sendKey(alternateKey);
			}
		};
	};
	var timer = setInterval(function(){
		console.log('OnlyJForLR: Keybind ', Keybind);
		if (Keybind) {
			eventFunction('j', 'next_item_offset', 's');
			eventFunction('k', 'prev_item_offset', 'a');
			clearInterval(timer);
		}
	}, 1000);
}).toString() + ")();";

//スクリプトのサイトスペースへのエクスポート
function exportToSite() {
	var scriptContent = '';
	for (var i = 0; i < arguments.length; i++) {
		scriptContent += arguments[i].toString() + '\n';
	}
	addScriptNode(scriptContent);
}

//スクリプトノードの生成
function addScriptNode(content){
	var headNode = document.querySelector('head');
	var scriptNode = document.createElement('script');
	scriptNode.setAttribute('type','text/javascript');
	//ちゃんとテキストノード作って追加しないとWindows版のChromeで動かない
	var textNode = document.createTextNode();
	textNode.nodeValue = '//<![CDATA[\n' + content + '\n//]]>';
	scriptNode.appendChild(textNode);
	headNode.appendChild(scriptNode);
}

//スクリプトノード追加
exportToSite(globalScript);
