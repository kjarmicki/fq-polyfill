## Purpose

This polyfill is supposed to be a (almost) complete drop-in fill for Feature Queries (@supports).
That means both window.CSS.supports DOM API and @support rules in CSS stylesheets.

## Motivation

Modernizr is wicked cool, but this polyfill has one slight advantage: when all major browsers finally implement Feature Queries interface, it's removal is trivial. You just delete it and everything should continue to work fine - as opposed to Modernizr's CSS-class-based declarations, which would require some rewriting.

## Usage

Load the script into a page and let it roll.

## Limitations

#### Inherited from StyleFix 1.0.3:

* Polyfilling code in @import-ed files is not supported
* Polyfilling cross-origin linked stylesheets is not supported, unless they are CORS-enabled


#### Rules parsing:

* Don't be a declaration ninja. Multi-testing stuff like ```background: rgba(0,0,0,.3) -webkit-linear-gradient(bottom, rgb(206,68,29) 7%, rgb(248,96,56) 54%)``` will most likely fail. Use one test declaration per rule
* For 2d transforms, test ```transform``` property. For 3d transforms, test ```perspective``` property


## How it works:

Use the source, Luke. But the big picture is: find all the styles, parse @support rules, use custom checks to determine support and then inject fixed styles.
Checking support is done with dedicated tests (see section Extending). If no dedicated test was found for a particular rule, it will fall back to simple property existence check, for example: 
```javascript
typeof document.createElement('div').style.transition === 'string';
```

## Extending

Polyfill comes with dedicated tests for some of the most often used CSS3 properties, but you can easily extend it with your own tests.
Use ```window.fqPolyfill.addTest``` for that.
This method takes one argument, which is a callback function. That function recieves one argument, an object, with following properties:
```javascript
{
	testElem: object // reference to <div> element injected into body with declaration styles
	// (ie. document.createElement('div').style.cssText = 'background-color: rgba(0,0,0,.3)'),
	declarationName: string // name of the tested declaration (ie. background-color),
	camelDeclarationName: string // as above, but camelCased (ie. backgroundColor),
	declarationValue: string // value of the tested declaration (ie. rgba(0,0,0,.3))
}
```
Callback function should return one of 3 values:
* ```true``` for test passed or 
* ```false``` for test failed or 
* ```undefined``` for incompetent test. If this option is confusing, think of it like that: for each @supports rule each declared test is being fired, so if we're testing ```transition``` support, then ```rgba``` test is incompetent in this case.

Whole example goes like this:
```javascript
fqPolyfill.addTest(function(data) {
	if(data.declarationValue.indexOf('rgba(') !== -1) { 
		// returns true or false if declaration has 'rgba(' string
		return data.testElem.style[data.camelDeclarationName].indexOf('rgba(') !== -1;
	}
	// returns undefined if declaration doesn't include 'rgba(' string
});
```

For more examples, you can refer to source code, method ```fqPolyfill.supportChecker.init``` contains all core tests.

## Browser support

Newest Chrome, Firefox, Safari, Opera, IE9+

## Changelog

* 26.10.2013 - Added interface for custom tests declaration, v0.8
* 20.10.2013 - Release into the wild, v0.7

## Credits

* Tokenizer, parser and condition tree based on ["Writing a Parser in Java" article from Cogito Learning](http://cogitolearning.co.uk/?p=523/ "Writing a Parser in Java")
* StyleFix loader taken from [Lea Verou's -prefix-free](http://leaverou.github.io/prefixfree/ "-prefix-free")
* Browser support checks based on [Modernizr](http://modernizr.com/ "Modernizr")
