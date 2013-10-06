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

	var fqPolyfill = win._fqPolyfill = {};

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
		CONDITION_NODE: 0,
		CONJUNCTION_NODE: 1,
		DISJUNCTION_NODE: 2
	};


	fqPolyfill.init = function() {
		
		this.tokenizer.init();

		if(!this.supportsJS()) {
			this.augmentJS();
		}

		/*
		if(!this.supportsCSS()) {
			this.augmentCSS();
		}
		*/

	};

	fqPolyfill.supportsJS = function() {
		return (typeof win.CSS === 'object' && typeof win.CSS.supports === 'function');
	};

	fqPolyfill.augmentJS = function() {

		if(typeof win.CSS === 'undefined') {
			win.CSS = {};
		}
		
		win.CSS.supports = function(rule) {
			return (fqPolyfill.parser.parse(fqPolyfill.tokenizer.tokenize(rule))).getValue();
		};
	};

	fqPolyfill.supportsCSS = function() {

		var styleElem = document.createElement('style'),
			testElem = document.createElement('div'),
			body = document.body,
			rules = '#fqPolyfillTestElem { display: block; } ' + 
					'@supports (display: inline) { #fqPolyfillTestElem { display: inline; } }',
			result;


		testElem.id = 'fqPolyfillTestElem';
		styleElem.appendChild(document.createTextNode(rules));

		body.appendChild(styleElem);
		body.appendChild(testElem);

		result = (win.getComputedStyle(testElem).display === 'inline');

		body.removeChild(styleElem);
		body.removeChild(testElem);

		return result;

	};


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

			var deleteComments = function(str) {

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

					return deleteComments(str);
				}

				return str;

			};
			
			str = str
					.replace(fqPolyfill.CHARACTER_SETS.NEWLINE_N, ' ')
					.replace(fqPolyfill.CHARACTER_SETS.NEWLINE_R, ' ')
					.trim();

			str = deleteComments(str);

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

		testLiterally: ['transform-style'],
		
		inject: function(declaration, useDOM, testFunc) {
			
			var testElem = document.createElement('div'),
				body = document.body,
				result;

			if(useDOM) {
				testElem.style.cssText = declaration;
				body.appendChild(testElem);
			}

			result = testFunc(testElem);

			if(useDOM) {
				testElem.parentNode.removeChild(testElem);
			}

			return !!result; 

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

			var that = this,
				result,
				declaration = declarationName + ': ' + declarationValue,
				camelDeclarationName = this.camelize(declarationName),

				test = function(against, useDOM) {
					return that.inject(declaration, !!useDOM, function(testElem) {
						return (typeof testElem.style[camelDeclarationName] === 'string' && against(testElem));
					});
				};

			// all the literate values
			if(this.testLiterally.indexOf(declarationName) !== -1) {
				result = test(function(testElem) {
					return (testElem.style[camelDeclarationName] === declarationValue);
				});
			}

			// rgba colors
			if(declarationValue.indexOf('rgba(') !== -1) {
				result = test(function(testElem) {
					return (testElem.style[camelDeclarationName].indexOf('rgba(') !== -1);
				}, true);
			}

			// hsla colors
			if(declarationValue.indexOf('hsla(') !== -1 && result !== false) {
				result = test(function(testElem) {
					return (testElem.style[camelDeclarationName].indexOf('rgba(') !== -1 || testElem.style[camelDeclarationName].indexOf('hsla(') !== -1);
				}, true);
			}

			// multiple backgrounds
			if(declarationName.indexOf('background') !== -1 && declarationValue.indexOf(',') !== -1 && result !== false) {
				declarationName = camelDeclarationName = 'background';
				declarationValue = 'url(https://),url(https://),red url(https://)';
				declaration = declarationName + ': ' + declarationValue,
				result = test(function(testElem) {
					return (/(url\s*\(.*?){3}/).test(testElem.style.background);
				}, true);
			}

			// calc
			if(declarationValue.indexOf('calc(') !== -1 && result !== false) {
				result = test(function(testElem) {
					return (testElem.style[camelDeclarationName].indexOf('calc(') !== -1);
				}, true);
			}


			// simple property existence check
			if(typeof result === 'undefined') {
				result = test(function(testElem) {
					return true;
				});
			}
			

			return result;

		}
	
	};


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

		for(i = 0; i < this.conditions; i++) {
			if(this.condition.getValue() === true) {
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
