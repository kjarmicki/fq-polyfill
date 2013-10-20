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

* Don't be a declaration ninja. Multi-testing stuff like ```css background: rgba(0,0,0,.3) -webkit-linear-gradient(bottom, rgb(206,68,29) 7%, rgb(248,96,56) 54%)``` will most likely fail. Use one test declaration per rule
* For 2d transforms, test transform property. For 3d transforms, test perspective property


## How it works:

Use the source, Luke. But the big picture is: find all the styles, parse @support rules, use custom checks to determine support and then inject fixed styles.

## Browser support

Newest Chrome, Firefox, Safari, Opera, IE9+

## Changelog

* 20.10.2013 - Release into the wild, v0.7

## Credits

* Tokenizer, parser and condition tree based on ["Writing a Parser in Java" article from Cogito Learning](http://cogitolearning.co.uk/?p=523/ "Writing a Parser in Java")
* StyleFix loader taken from [Lea Verou's -prefix-free](http://leaverou.github.io/prefixfree/ "-prefix-free")
* Browser support checks based on [Modernizr](http://modernizr.com/ "Modernizr")
