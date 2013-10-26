/*
 * Feature Queries (@supports) polyfill
 *
 *
 * Drop-in polyfill for window.CSS.supports and @supports CSS rules
 * Licensed MIT
 *
 * @author Krystian Jarmicki
 * @version 0.8.1
 * @preserve
 */

;(function(win) {

	'use strict';

	var mixin = function(/* objects */) {
		
		var objects = Array.prototype.slice.call(arguments),
			i,
			property,
			base = objects[0];

		for(i = 1; i < objects.length; i++) {
			for(property in objects[i])	{
				base[property] = objects[i][property];
			}
		}

		return base;

	};

	var $ = function(selector) {
		return Array.prototype.slice.call(win.document.querySelectorAll(selector));
	};


	var fqPolyfill = win.fqPolyfill = {};

	// terminal symbols used in @supports rule parsing
	fqPolyfill.TERMINALS = {
		_END: 0,
		OR: 1,
		AND: 2,
		NOT: 3,
		OPEN_BRACKET: 4,
		CLOSE_BRACKET: 5,
		SINGLE_QUOTED_CONTENT: 6,
		DOUBLE_QUOTED_CONTENT: 7,
		DOUBLE_COLON: 8,
		RULENAME: 9,
		ARITHMETIC: 10
	};

	fqPolyfill.CHARACTER_SETS = {
		NEWLINE_N: /\n+/g,
		NEWLINE_R: /\r+/g,
		COMMENT: ''
	};

	fqPolyfill.EXPRESSION_NODES = {
		CONDITION_NODE: 0, // simple condition
		CONJUNCTION_NODE: 1, // AND condition
		DISJUNCTION_NODE: 2 // OR condition
	};


	fqPolyfill.init = function() {
		
		this.tokenizer.init();
		this.supportChecker.init();

		if(!this.checker.supportsJS()) {
			this.checker.augmentJS();
		}

		if(!this.checker.supportsCSS()) {
			this.checker.watchCSS();
		}

	};

	fqPolyfill.checker = {
		
		supportsJS: function() {
			return (typeof win.CSS === 'object' && typeof win.CSS.supports === 'function');
		},

		augmentJS: function() {

			if(typeof win.CSS === 'undefined') {
				win.CSS = {};
			}
		
			win.CSS.supports = function(rule, value) {

				var check = (typeof value === 'string' || typeof value === 'number') ? rule + ': ' + value : rule;
			
				return (fqPolyfill.parser.parse(fqPolyfill.tokenizer.tokenize(check))).getValue();

			};
		},

		supportsCSS: function() {

			var styleElem = win.document.createElement('style'),
				testElem = win.document.createElement('div'),
				body = win.document.body,
				rules = '#fqPolyfillTestElem { display: block; } ' + 
						'@supports (display: inline) { #fqPolyfillTestElem { display: inline; } }',
				result;


			testElem.id = 'fqPolyfillTestElem';
			styleElem.appendChild(win.document.createTextNode(rules));

			body.appendChild(styleElem);
			body.appendChild(testElem);

			result = (win.getComputedStyle(testElem).display === 'inline');

			body.removeChild(styleElem);
			body.removeChild(testElem);

			return result;

		},

		// run styleFix when ready
		watchCSS: function() {

			fqPolyfill.styleFix.register(this.augmentCSS.bind(this));
		
			setTimeout(function() {
				$('link[rel="stylesheet"]').forEach(fqPolyfill.styleFix.link);
			}, 10);

			win.document.addEventListener('DOMContentLoaded', fqPolyfill.styleFix.process, false);
		},

		/*
		 * CSS augmentation works like this:
		 *
		 * grab all the @supports rules with declarations depending on them,
		 * for each part,
		 *  check if browser supports the rule,
		 *   if it does - strip @supports rule (that will make browser parse the declarations)
		 *   if it doesn't - strip @supports rule with it's declarations
		 */
		augmentCSS: function(css, raw, element) {

			var supportsParts;

			css = this.deleteCSSComments(css);
			supportsParts = this.findSupportsParts(css);

			if(supportsParts.length > 0) {
				supportsParts.forEach(function(part) {
					css = css.replace(part, this.substituteSupportsPart(part));
				}.bind(this));
			}

			return css;
		},

		findSupportsParts: function(css) {
			
			var atRuleIndex,
				foundText,
				foundAll = [];

			while((atRuleIndex = css.indexOf('@supports')) !== -1) {
				foundText = this.getRulesInParens(css.slice(atRuleIndex));
				foundAll.push(foundText);
				css = css.replace(foundText, '');
			}

			return foundAll;

		},

		getRulesInParens: function(css) {

			var parensCounter = 0,
				rules = '',
				open,
				close;

			do {

				open = css.indexOf('{');
				close = css.indexOf('}');

				if(open < close && open !== -1) {
					parensCounter++;
					rules += css.slice(0, open + 1);
					css = css.slice(open + 1);
				}
				else if(close !== -1) {
					parensCounter--;	
					rules += css.slice(0, close + 1);
					css = css.slice(close + 1);
				}

			} while(parensCounter > 0 && (open !== -1 || close !== -1) /* sanity check */ && parensCounter < 5);


			return rules;

		},
		
		substituteSupportsPart: function(part) {

			var atRule = part.replace('@supports', ''),
				declarationsBody;
			
			// find @supports declaration rule
			atRule = atRule.slice(0, atRule.indexOf('{')).trim();

			// if rule is supported, return declarations for the rule
			if((fqPolyfill.parser.parse(fqPolyfill.tokenizer.tokenize(atRule))).getValue()) {
				declarationsBody = part.slice(part.indexOf('{') + 1, part.length - 1);
				
				return declarationsBody;
			}
			// otherwise, return empty string
			else {
				return '';
			}

		},

		deleteCSSComments: function(str) {

			var start = str.indexOf('/*'),
				end = str.indexOf('*/') + 2,
				found = false;
			
			if(start > -1) {
				if(end === -1 || start > end) {
					throw 'Parse error: unterminated comment';
				}
				str = str.replace(
					str.substr(start, end - start), ''
				);

				return this.deleteCSSComments(str);
			}

			return str;

		}

	};


	/**
	 * StyleFix 1.0.3 (adjusted to fqPolyfill)
	 * @author Lea Verou
	 * MIT license
	 */

	fqPolyfill.styleFix = {

		postfix: 'fqpolyfill',

		link: function(link) {
			try {
				// Ignore stylesheets with data-{fqPolyfill.postfix} attribute as well as alternate stylesheets
				if(link.rel !== 'stylesheet' || link.hasAttribute('data-' + fqPolyfill.postfix)) {
					return;
				}
			}
			catch(e) {
				return;
			}

			var url = link.href || link.getAttribute('data-href'),
				base = url.replace(/[^\/]+$/, ''),
				base_scheme = (/^[a-z]{3,10}:/.exec(base) || [''])[0],
				base_domain = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(base) || [''])[0],
				base_query = /^([^?]*)\??/.exec(url)[1],
				parent = link.parentNode,
				xhr = new XMLHttpRequest(),
				process;

			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4) {
					process();
				}
			};

			process = function() {

				var css = xhr.responseText;

				if(css && link.parentNode && (!xhr.status || xhr.status < 400 || xhr.status > 600)) {
					css = fqPolyfill.styleFix.fix(css, true, link);

					// Convert relative URLs to absolute, if needed
					if(base) {
						css = css.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function($0, quote, url) {
							if(/^([a-z]{3,10}:|#)/i.test(url)) { // Absolute & or hash-relative
								return $0;
							}
							else if(/^\/\//.test(url)) { // Scheme-relative
								// May contain sequences like /../ and /./ but those DO work
								return 'url("' + base_scheme + url + '")';
							}
							else if(/^\//.test(url)) { // Domain-relative
								return 'url("' + base_domain + url + '")';
							}
							else if(/^\?/.test(url)) { // Query-relative
								return 'url("' + base_query + url + '")';
							}
							else {
								// Path-relative
								return 'url("' + base + url + '")';
							}
						});

						// behavior URLs shoudn’t be converted (Issue #19)
						// base should be escaped before added to RegExp (Issue #81)
						var escaped_base = base.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");
						css = css.replace(new RegExp('\\b(behavior:\\s*?url\\(\'?"?)' + escaped_base, 'gi'), '$1');
					}

					var style = win.document.createElement('style');

					style.textContent = css;
					style.media = link.media;
					style.disabled = link.disabled;
					style.setAttribute('data-href', link.getAttribute('href'));

					parent.insertBefore(style, link);
					parent.removeChild(link);

					style.media = link.media; // Duplicate is intentional. See issue #31
				}
			};

			try {
				xhr.open('GET', url);
				xhr.send(null);
			} catch (e) {
				// Fallback to XDomainRequest if available
				if (typeof XDomainRequest !== "undefined") {
					xhr = new XDomainRequest();
					xhr.onerror = xhr.onprogress = function() {};
					xhr.onload = process;
					xhr.open("GET", url);
					xhr.send(null);
				}
			}

			link.setAttribute('data-' + fqPolyfill.styleFix.postfix + 'progress', '');
		},

		styleElement: function(style) {
			if (style.hasAttribute('data-' + fqPolyfill.styleFix.postfix)) {
				return;
			}
			var disabled = style.disabled;

			style.textContent = fqPolyfill.styleFix.fix(style.textContent, true, style);

			style.disabled = disabled;
		},

		styleAttribute: function(element) {
			var css = element.getAttribute('style');

			css = fqPolyfill.styleFix.fix(css, false, element);

			element.setAttribute('style', css);
		},

		process: function() {
			// Linked stylesheets
			$('link[rel="stylesheet"]:not([data-' + fqPolyfill.styleFix.postfix + 'progress])').forEach(fqPolyfill.styleFix.link);

			// Inline stylesheets
			$('style').forEach(fqPolyfill.styleFix.styleElement);

			// Inline styles
			$('[style]').forEach(fqPolyfill.styleFix.styleAttribute);
		},

		register: function(fixer, index) {
			(fqPolyfill.styleFix.fixers = fqPolyfill.styleFix.fixers || [])
			.splice(index === undefined? fqPolyfill.styleFix.fixers.length : index, 0, fixer);
		},

		fix: function(css, raw, element) {
			for(var i=0; i < fqPolyfill.styleFix.fixers.length; i++) {
				css = fqPolyfill.styleFix.fixers[i](css, raw, element) || css;
			}

			return css;
		},

		camelCase: function(str) {
			return str.replace(/-([a-z])/g, function($0, $1) { return $1.toUpperCase(); }).replace('-','');
		},

		deCamelCase: function(str) {
			return str.replace(/[A-Z]/g, function($0) { return '-' + $0.toLowerCase(); });
		}
	};
	// end of StyleFix 1.0.3 (adjusted to fqPolyfill)


	fqPolyfill.tokenizer = {

		definitions: {},

		init: function() {
			
			this.definitions[fqPolyfill.TERMINALS.OR] = /^or/i;
			this.definitions[fqPolyfill.TERMINALS.AND] = /^and/i;
			this.definitions[fqPolyfill.TERMINALS.NOT] = /^not/i;
			this.definitions[fqPolyfill.TERMINALS.OPEN_BRACKET] = /^\(/;
			this.definitions[fqPolyfill.TERMINALS.CLOSE_BRACKET] = /^\)/;
			this.definitions[fqPolyfill.TERMINALS.SINGLE_QUOTED_CONTENT] = /^\'.+',?/;
			this.definitions[fqPolyfill.TERMINALS.DOUBLE_QUOTED_CONTENT] = /^\".+",?/;
			this.definitions[fqPolyfill.TERMINALS.DOUBLE_COLON] = /^:/;
			this.definitions[fqPolyfill.TERMINALS.RULENAME] = /^-?[a-zA-Z0-9%\.!\/#,]+[a-zA-Z0-9-%\.,\/#]*/;
			this.definitions[fqPolyfill.TERMINALS.ARITHMETIC] = /^(\+|\-|\/|\*)/;

		},

		sanitize: function(str) {
			
			str = str
					.replace(fqPolyfill.CHARACTER_SETS.NEWLINE_N, ' ')
					.replace(fqPolyfill.CHARACTER_SETS.NEWLINE_R, ' ')
					.trim();

			return str;

		},

		tokenize: function(str) {

			var found, 
				result = [],
				terminal;
			
			str = this.sanitize(str);

			while(str !== '') {

				for(terminal in this.definitions) {
					if(this.definitions.hasOwnProperty(terminal)) {

						found = this.definitions[terminal].exec(str);
						
						if(found) {
							result.push({
								token: parseInt(terminal, 10),
								sequence: found[0]
							});

							str = str.replace(found[0], '').trim();
							break;
						}
					}
				}

				if(!found) {
					throw 'Parse error: Unexpected input: ' + str;
				}
			}

			return result;
		}

	};


	fqPolyfill.supportChecker = {

		tests: [],

		cachedElem: win.document.createElement('div'),

		init: function() {

			// add dedicated tests

			// rgba colors
			this.addTest(function(data) {
				if(data.declarationValue.indexOf('rgba(') !== -1) {
					return data.testElem.style[data.camelDeclarationName].indexOf('rgba(') !== -1;
				}
			});

			// hsla colors
			this.addTest(function(data) {
				if(data.declarationValue.indexOf('hsla(') !== -1) {
					return (data.testElem.style[data.camelDeclarationName].indexOf('rgba(') !== -1 || data.testElem.style[data.camelDeclarationName].indexOf('hsla(') !== -1);
				}
			});

			// gradients
			this.addTest(function(data) {
				if(data.declarationValue.indexOf('-gradient(') !== -1) {
					return (data.testElem.style[data.camelDeclarationName].indexOf('gradient') !== -1);
				}
			});

			// multiple backgrounds
			this.addTest(function(data) {
				if(data.declarationName.indexOf('background') !== -1 && data.declarationValue.indexOf(',') !== -1 && data.declarationValue.indexOf('-gradient(') === -1) {
					data.testElem.style.background = 'url(https://),url(https://),red url(https://)';
					return (/(url\s*\(.*?){3}/).test(data.testElem.style.background);
				}
			});
			
			// calc
			this.addTest(function(data) {
				if(data.declarationValue.indexOf('calc(') !== -1) {
					return (data.testElem.style[data.camelDeclarationName].indexOf('calc(') !== -1);
				}
			});

			// transform-style: preserve-3d
			this.addTest(function(data) {
				if(data.declarationName.indexOf('transform-style') !== -1 && data.declarationValue === 'preserve-3d') {
					return (data.testElem.style[data.camelDeclarationName] === 'preserve-3d');
				}
			});
			
		},

		addTest: function(testFunc) {
			this.tests.push(testFunc);
		},

		inject: function(declaration, testFunc) {
			
			var testElem = win.document.createElement('div'),
				body = win.document.body,
				result;

			testElem.style.cssText = declaration;
			body.appendChild(testElem);

			result = testFunc(testElem);

			testElem.parentNode.removeChild(testElem);

			return !!result; 

		},

		styleExists: function(camelDeclarationName) {
			return (typeof this.cachedElem.style[camelDeclarationName] === 'string');
		},

		camelize: function(str) {

			if(str.indexOf('-ms-') === 0) {
				str = str.replace('-ms', 'ms');
			}

			return str.replace(/-[a-zA-Z]/g, function(found, i, whole) {
				return whole[i + 1].toUpperCase();
			});

		},

		declaration: function(declarationName, declarationValue) {

			var result,
				declaration = declarationName + ': ' + declarationValue,
				camelDeclarationName = this.camelize(declarationName),
				i;

			// try dedicated test
			for(i = 0; i < this.tests.length; i++) {
				if(typeof result === 'undefined') {
					// in dedicated test:
					// true means test pass
					// false means test fail
					// undefined means this test is not meant for this property
					this.inject(declaration, function(testElem) {
						result = this.tests[i]({
							testElem: testElem,
							declarationName: declarationName,
							declarationValue: declarationValue,
							camelDeclarationName: camelDeclarationName
						});
					}.bind(this));
				}
			}	

			// dedicated test not found, fall to simple property existence check
			if(typeof result === 'undefined') {
				result = this.styleExists(camelDeclarationName);
			}
			

			return result;

		}
	
	};

	fqPolyfill.addTest = fqPolyfill.supportChecker.addTest.bind(fqPolyfill.supportChecker);


	/*
	 * expression tree nodes
	 */

	var NegationNode = function() {

		this.isNegated = false;

	};

	NegationNode.prototype.negate = function() {

		this.isNegated = !this.isNegated;

	};

	NegationNode.prototype.includeNegation = function(result) {

		if(this.isNegated) {
			return !result;
		}
		else {
			return result;
		}

	};

	var ConditionNode = function(declarationName, declarationValue) {
		
		NegationNode.apply(this, arguments);
		this.declarationName = declarationName;
		this.declarationValue = declarationValue;

	};

	ConditionNode.prototype = Object.create(NegationNode.prototype);

	ConditionNode.prototype.getType = function() {

		return fqPolyfill.EXPRESSION_NODES.CONDITION_NODE;

	};

	ConditionNode.prototype.getValue = function() {

		var value = fqPolyfill.supportChecker.declaration(this.declarationName, this.declarationValue);

		return this.includeNegation(value);

	};


	var ContainerNode = function(/* nodes.. */) {

		var nodes = Array.prototype.slice.call(arguments),
			i;

		this.conditions = [];

		for(i = 0; i < nodes.length; i++) {
			this.add(nodes[i]);
		}

	};

	ContainerNode.prototype.add = function(node) {

		this.conditions.push(node);

	};

	
	var ConjunctionNode = function(/* nodes.. */) {

		NegationNode.apply(this, arguments);
		ContainerNode.apply(this, arguments);

	};

	ConjunctionNode.prototype = mixin(Object.create(NegationNode.prototype), Object.create(ContainerNode.prototype));

	ConjunctionNode.prototype.getType = function() {

		return fqPolyfill.EXPRESSION_NODES.CONJUNCTION_NODE;

	};

	ConjunctionNode.prototype.getValue = function() {

		var result = true,
			i;

		for(i = 0; i < this.conditions.length; i++) {
			if(this.conditions[i].getValue() === false) {
				result = false;
				break;
			}
		}

		return this.includeNegation(result);

	};


	var DisjunctionNode = function(/* nodes.. */) {

		NegationNode.apply(this, arguments);
		ContainerNode.apply(this, arguments);

	};


	DisjunctionNode.prototype = mixin(Object.create(NegationNode.prototype), Object.create(ContainerNode.prototype));

	DisjunctionNode.prototype.getType = function() {

		return fqPolyfill.EXPRESSION_NODES.DISJUNCTION_NODE;

	};

	DisjunctionNode.prototype.getValue = function() {

		var result = false,
			i;

		for(i = 0; i < this.conditions.length; i++) {
			if(this.conditions[i].getValue() === true) {
				result = true;
				break;
			}
		}

		return this.includeNegation(result);

	};



	/*
	 * feature queries parse rules based quite faithfully on http://www.w3.org/TR/css3-conditional/#supports_condition 
	 * css value parse rules massively simplified
	 *
	 *
	 * -- productions: 
	 * supports_condition -> supports_negation
	 * supports_condition -> supports_conjunction
	 * supports_condition -> supports_disjunction
	 * supports_condition -> supports_condition_in_parens
	 * 
	 * supports_condition_in_parens -> OPEN_BRACKET + supports_condition + CLOSE_BRACKET
	 * supports_condition_in_parens -> supports_declaration_condition
	 * 
	 * supports_negation -> NOT + supports_condition_in_parens
	 * 
	 * supports_conjunction -> supports_condition_in_parens + AND + supports_condition_in_parens
	 * 
	 * supports_disjunction -> supports_condition_in_parens + OR + supports_condition_in_parens
	 * 
	 * supports_declaration_condition -> OPEN_BRACKET + declaration + CLOSE_BRACKET
	 *
	 * declaration -> RULENAME + DOUBLE_COLON + declaration_value
	 *
	 * declaration_value -> RULENAME
	 * declaration_value -> declaration_value + declaration_value
	 * declaration_value -> ARITHMETIC + declaration_value
	 * declaration_value -> OPEN_BRACKET + declaration_value + CLOSE_BRACKET
	 * declaration_value -> OPEN_BRACKET + declaration_value + CLOSE_BRACKET
	 * declaration_value -> SINGLE_QUOTED_CONTENT
	 * declaration_value -> DOUBLE_QUOTED_CONTENT
	 * 
	 */
 
	fqPolyfill.parser = {

		tokens: null,
		lookahead: null,

		parse: function(tokens) {

			var conditionNode;

			this.tokens = tokens.slice();
			this.lookahead = this.tokens[0];

			conditionNode = this.supportsCondition();

			if(this.lookahead.token !== fqPolyfill.TERMINALS._END) {
				throw 'Parse error: unexpected sequence at the end of input: "' + this.lookahead.sequence + '"';
			}

			return conditionNode;

		},

		nextToken: function() {
			
			this.tokens.shift();

			if(this.tokens.length === 0) {
				this.lookahead = {
					token: fqPolyfill.TERMINALS._END,
					sequence: ''
				};
			}
			else {
				this.lookahead = this.tokens[0];
			}
		},

		supportsCondition: function() {

			var conditionNode,
				conjunctionNode,
				disjunctionNode;
				
 
			// supports_condition -> supports_negation
			if(this.lookahead.token === fqPolyfill.TERMINALS.NOT) {
				this.nextToken();

				conditionNode = this.supportsConditionInParens();
				conditionNode.negate();

				return conditionNode;
			}
			else {
				// supports_condition -> supports_condition_in_parens
				conditionNode = this.supportsConditionInParens();


				// supports_condition -> supports_conjunction
				if(this.lookahead.token === fqPolyfill.TERMINALS.AND) {

					conjunctionNode = new ConjunctionNode(conditionNode);

					while(this.lookahead.token === fqPolyfill.TERMINALS.AND) {
						this.nextToken();
						conjunctionNode.add(this.supportsConditionInParens());
					}

					return conjunctionNode;
				}

				// supports_condition -> supports_disjunction
				if(this.lookahead.token === fqPolyfill.TERMINALS.OR) {

					disjunctionNode = new DisjunctionNode(conditionNode);

					while(this.lookahead.token === fqPolyfill.TERMINALS.OR) {
						this.nextToken();
						disjunctionNode.add(this.supportsConditionInParens());
					}

					return disjunctionNode;
				}

				return conditionNode;
			}

		},

		supportsConditionInParens: function() {

			var conditionNode;
			
			if(this.lookahead.token === fqPolyfill.TERMINALS.OPEN_BRACKET) {
			
				this.nextToken();
			
				// supports_condition_in_parens -> supports_declaration_condition
				if(this.lookahead.token === fqPolyfill.TERMINALS.RULENAME) {
					conditionNode = this.declaration();
				}

				// supports_condition_in_parens -> OPEN_BRACKET + supports_condition + CLOSE_BRACKET
				else {
					conditionNode = this.supportsCondition();
				}

				if(this.lookahead.token !== fqPolyfill.TERMINALS.CLOSE_BRACKET) {
					throw 'Parse error: unexpected sequence "' + this.lookahead.sequence + '", expecting ")"';
				}

				this.nextToken();


				return conditionNode;

			}
			else {
				throw 'Parse error: unexpected sequence "' + this.lookahead.sequence + '", expecting "("';
			}
		},

		declaration: function() {

			var declarationNameText = this.lookahead.sequence,
				declarationValueText = '';
		
			this.nextToken();

			if(this.lookahead.token === fqPolyfill.TERMINALS.DOUBLE_COLON) {
				
				this.nextToken();

				declarationValueText = this.declarationValue();

				if(!declarationValueText) {
					throw 'Parse error: unexpected sequence "' + this.lookahead.sequence + '", expecting declaration value';
				}

				return new ConditionNode(declarationNameText, declarationValueText);

			}
			else {
				throw 'Parse error: unexpected sequence "' + this.lookahead.sequence + '", expecting ":"';
			}
		},

		declarationValue: function() {

			var declarationValueText = '',
				declarationValuePart = '';
			
			// declaration_value -> RULENAME
			if(this.lookahead.token === fqPolyfill.TERMINALS.RULENAME) {
				declarationValueText += this.lookahead.sequence;
				this.nextToken();
			}
			

			// declaration_value -> ARITHMETIC + declaration_value
			if(this.lookahead.token === fqPolyfill.TERMINALS.ARITHMETIC) {
				declarationValueText += ' ' + this.lookahead.sequence + ' ';
				this.nextToken();
				declarationValueText += this.declarationValue();
			}

			// declaration_value -> OPEN_BRACKET + declaration_value + CLOSE_BRACKET
			if(this.lookahead.token === fqPolyfill.TERMINALS.OPEN_BRACKET) {
				declarationValueText += this.lookahead.sequence;
				this.nextToken();

				declarationValueText += this.declarationValue();

				if(this.lookahead.token !== fqPolyfill.TERMINALS.CLOSE_BRACKET) {
					throw 'Parse error: unexpected sequence "' + this.lookahead.sequence + '", expecting ")"';
				}
				declarationValueText += this.lookahead.sequence;

				this.nextToken();
			}

			// declaration_value -> SINGLE_QUOTED_CONTENT
			if(this.lookahead.token === fqPolyfill.TERMINALS.SINGLE_QUOTED_CONTENT) {
				declarationValueText += this.lookahead.sequence;
				this.nextToken();
			}


			// declaration_value -> DOUBLE_QUOTED_CONTENT
			if(this.lookahead.token === fqPolyfill.TERMINALS.DOUBLE_QUOTED_CONTENT) {
				declarationValueText += this.lookahead.sequence;
				this.nextToken();
			}

			// declaration_value -> declaration_value + declaration_value
			if(
				this.lookahead.token === fqPolyfill.TERMINALS.RULENAME ||
				this.lookahead.token === fqPolyfill.TERMINALS.ARITHMETIC ||
				this.lookahead.token === fqPolyfill.TERMINALS.OPEN_BRACKET ||
				this.lookahead.token === fqPolyfill.TERMINALS.SINGLE_QUOTED_CONTENT ||
				this.lookahead.token === fqPolyfill.TERMINALS.DOUBLE_QUOTED_CONTENT
			) {
				return declarationValueText + ' ' + this.declarationValue();
			}


			return declarationValueText;
		}

	};

	fqPolyfill.init();
	
}(this));
