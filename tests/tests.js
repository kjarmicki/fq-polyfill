;(function(win) {

	'use strict';

	var Modernizr = win.Modernizr,
		q = win.QUnit,
		polyfill = win.fqPolyfill,
		dataSets = [],
		helpers = win.helpers;


	dataSets.push({
		desc: 'plain rule',
		rule: '(transition: none)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'transition',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'none',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'transition: none');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('transition');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'transition support properly detected');
		}
	});

	dataSets.push({
		desc: 'webkit prefixed rule',
		rule: '(-webkit-transition: none)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '-webkit-transition',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'none',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, '-webkit-transition: none');

		},
		testResult: function(result) {

			var value = result.getValue(),
				expected = !!Modernizr.testProp('WebkitTransition');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + '-webkit-transition support properly detected');
		}
	});

	dataSets.push({
		desc: 'moz prefixed rule',
		rule: '(-moz-transition: none)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '-moz-transition',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'none',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, '-moz-transition: none');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('MozTransition');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + '-moz-transition support properly detected');
		}
	});

	dataSets.push({
		desc: 'o prefixed rule',
		rule: '(-o-transition: none)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '-o-transition',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'none',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, '-o-transition: none');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('OTransition');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + '-o-transition support properly detected');
		}
	});

	dataSets.push({
		desc: 'ms prefixed rule',
		rule: '(-ms-transition: none)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '-ms-transition',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'none',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, '-ms-transition: none');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('msTransition');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + '-ms-transition support properly detected');
		}
	});


	dataSets.push({
		desc: 'rule with dash',
		rule: '(border-image: none)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'border-image',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'none',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {
			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'border-image: none');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('borderImage');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'border-image support properly detected');
		}
	});

	dataSets.push({
		desc: 'rule with px value',
		rule: '(border-radius: 10px)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'border-radius',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '10px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {
			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'border-radius: 10px');
		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('borderRadius');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'border-radius support properly detected');
		}
	});

	dataSets.push({
		desc: 'rule with percent value',
		rule: '(border-radius: 10%)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'border-radius',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '10%',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {
			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'border-radius: 10%');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('borderRadius');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'border-radius support properly detected');

		}
	});

	dataSets.push({
		desc: 'rule with url value',
		rule: '(background: url(../some/stuff))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'url',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '../some/stuff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {
			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'background: url(../some/stuff)');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});

	dataSets.push({
		desc: 'rule with url value in single quotes',
		rule: '(background: url(\'../some/stuff\'))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'url',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: "'../some/stuff'",
						token: polyfill.TERMINALS.SINGLE_QUOTED_CONTENT
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {
			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'background: url(\'../some/stuff\')');
		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});

	dataSets.push({
		desc: 'rule with url value in double quotes',
		rule: '(background: url("../some/stuff"))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'url',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '"../some/stuff"',
						token: polyfill.TERMINALS.DOUBLE_QUOTED_CONTENT
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'background: url("../some/stuff")');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});

	dataSets.push({
		desc: 'rule with rgba color value',
		rule: '(background: rgba(0,0,0,.3))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'rgba',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '0,0,0,.3',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'background: rgba(0,0,0,.3)');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = Modernizr.rgba;

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'rgba support properly detected');
		}
	});


	dataSets.push({
		desc: 'rule with hsla color value',
		rule: '(background: hsla(0,10%,10%,0.1))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'hsla',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '0,10%,10%,0.1',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'background: hsla(0,10%,10%,0.1)');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = Modernizr.hsla;

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'hsla support properly detected');

		}
	});


	dataSets.push({
		desc: 'rule with calc value',
		rule: '(width: calc(100% - 2 * (10px + 2px) + 5px))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'calc',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '100%',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '-',
						token: polyfill.TERMINALS.ARITHMETIC
					},
					{
						sequence: '2',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '*',
						token: polyfill.TERMINALS.ARITHMETIC
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '10px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '+',
						token: polyfill.TERMINALS.ARITHMETIC
					},
					{
						sequence: '2px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: '+',
						token: polyfill.TERMINALS.ARITHMETIC
					},
					{
						sequence: '5px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'width: calc(100% - 2 * (10px + 2px)  + 5px)');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = Modernizr.csscalc;

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'calc support properly detected');

		}
	});

	dataSets.push({
		desc: 'microsoft 2d transform',
		rule: '(-ms-transform: rotate(90deg))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '-ms-transform',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'rotate',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '90deg',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {
			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, '-ms-transform: rotate(90deg)');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('msTransform');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + '-ms-transform support properly detected');

		}
	});

	dataSets.push({
		desc: 'microsoft 3d transform',
		rule: '(-ms-perspective: 200px)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '-ms-perspective',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '200px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {
			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, '-ms-perspective: 200px');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = !!Modernizr.testProp('msPerspective');

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + '-ms-perspective support properly detected');

		}
	});

	dataSets.push({
		desc: 'rule with multiple values',
		rule: '(background: #ccc url(../some/stuff) no-repeat center center)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '#ccc',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'url',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '../some/stuff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'no-repeat',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'center',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'center',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'background: #ccc url(../some/stuff) no-repeat center center');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});


	dataSets.push({
		desc: 'linear gradient',
		rule:	'(background: -moz-linear-gradient(top, #000000 0%, #ffffff 100%)) OR ' +
				'(background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #000000), color-stop(100%, #ffffff))) OR ' +
				'(background: -webkit-linear-gradient(top, #000000 0%, #ffffff 100%)) OR ' +
				'(background: -o-linear-gradient(top, #000000 0%, #ffffff 100%)) OR ' +
				'(background: -ms-linear-gradient(top, #000000 0%, #ffffff 100%)) OR ' +
				'(background: linear-gradient(to bottom, #000000 0%, #ffffff 100%))',

		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '-moz-linear-gradient',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'top,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#000000',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '0%,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#ffffff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '100%',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '-webkit-gradient',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'linear,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'left',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'top,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'left',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'bottom,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'color-stop',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '0%,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#000000',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ',',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'color-stop',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '100%,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#ffffff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '-webkit-linear-gradient',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'top,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#000000',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '0%,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#ffffff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '100%',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '-o-linear-gradient',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'top,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#000000',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '0%,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#ffffff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '100%',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '-ms-linear-gradient',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'top,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#000000',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '0%,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#ffffff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '100%',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'linear-gradient',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'to',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'bottom,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#000000',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '0%,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '#ffffff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '100%',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');

		},
		testResult: function(result) {
			var value = result.getValue(),
				expected = Modernizr.cssgradients;

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'gradients support properly detected');
		}
	});

	dataSets.push({
		desc: 'multiple backgrounds',
		rule: '(background: url(../some/stuff), url(../other/stuff))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'background',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'url',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '../some/stuff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ',',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'url',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '../other/stuff',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'background: url(../some/stuff) , url(../other/stuff)');

		},
		testResult: function(result) {

			var value = result.getValue(),
				expected = Modernizr.multiplebgs;

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + 'multiple backgrounds support properly detected');
		}
	});


	dataSets.push({
		desc: 'MS transform-style: preserve-3d',
		rule: '(-ms-transform-style: preserve-3d)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '-ms-transform-style',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'preserve-3d',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, '-ms-transform-style: preserve-3d');

		},
		testResult: function(result) {

			var value = result.getValue(),
				expected = false,
				style = document.querySelector('#test-elem').style;

			if(typeof style.msTransformStyle === 'string') {
				style.msTransformStyle = 'preserve-3d';
				expected = (style.msTransformStyle === 'preserve-3d');
				style.msTransformStyle = '';
			}

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + '-ms-transform-style: preserve-3d support properly detected');
		}
	});

	dataSets.push({
		desc: 'MS transform-style: flat',
		rule: '(-ms-transform-style: flat)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '-ms-transform-style',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: 'flat',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, '-ms-transform-style: flat');

		},
		testResult: function(result) {

			// modernizr doesn't support transform-style check yet
			var value = result.getValue(),
				expected = false,
				style = document.querySelector('#test-elem').style;

			if(typeof style.msTransformStyle === 'string') {
				style.msTransformStyle = 'flat';
				expected = (style.msTransformStyle === 'flat');
				style.msTransformStyle = '';
			}

			q.deepEqual(value, expected, ((expected === false) ? 'lack of ' : '') + '-ms-transform-style: flat support properly detected');
		}
	});


	dataSets.push({
		desc: 'rule with multiple values, tabs and new lines',
		rule: '(font-family: "Times New Roman",\n\n Arial,\r Helvetica,\t sans-serif)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'font-family',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '"Times New Roman",',
						token: polyfill.TERMINALS.DOUBLE_QUOTED_CONTENT
					},
					{
						sequence: 'Arial,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'Helvetica,',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: 'sans-serif',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'font-family: "Times New Roman", Arial, Helvetica, sans-serif');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});	

	dataSets.push({
		desc: 'negated rule',
		rule: 'NOT (min-width: 30px)',
		tokens: [
					{
						sequence: 'NOT',
						token: polyfill.TERMINALS.NOT
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}
				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(result.isNegated, 'node is negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'result is a condition node');
			q.deepEqual(result.declarationName + ': ' + result.declarationValue, 'min-width: 30px');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(!value);
		}
	});


	dataSets.push({
		desc: 'conjunction rule',
		rule: '(min-width: 30px) AND (max-width: 60px)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'AND',
						token: polyfill.TERMINALS.AND
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}

				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONJUNCTION_NODE, 'result is a conjunction node');
			q.deepEqual(result.conditions.length, 2, 'result has two sub-nodes');

			q.ok(!result.isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].declarationName + ': ' + result.conditions[0].declarationValue, 'min-width: 30px');

			q.ok(!result.isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].declarationName + ': ' + result.conditions[1].declarationValue, 'max-width: 60px');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});


	dataSets.push({
		desc: 'negated conjunction rule',
		rule: 'NOT ((min-width: 30px) AND (max-width: 60px))',
		tokens: [
					{
						sequence: 'NOT',
						token: polyfill.TERMINALS.NOT
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},

					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'AND',
						token: polyfill.TERMINALS.AND
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}


				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(result.isNegated, 'node is negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONJUNCTION_NODE, 'result is a conjunction node');
			q.deepEqual(result.conditions.length, 2, 'result has two sub-nodes');

			q.ok(!result.conditions[0].isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].declarationName + ': ' + result.conditions[0].declarationValue, 'min-width: 30px');

			q.ok(!result.conditions[1].isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].declarationName + ': ' + result.conditions[1].declarationValue, 'max-width: 60px');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(!value);
		}
	});


	dataSets.push({
		desc: 'individually negated conjunction rule',
		rule: '(NOT (min-width: 30px)) AND (NOT (max-width: 60px))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'NOT',
						token: polyfill.TERMINALS.NOT
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'AND',
						token: polyfill.TERMINALS.AND
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'NOT',
						token: polyfill.TERMINALS.NOT
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}


				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.CONJUNCTION_NODE, 'result is a conjunction node');
			q.deepEqual(result.conditions.length, 2, 'result has two sub-nodes');

			q.ok(result.conditions[0].isNegated, 'first result node is negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].declarationName + ': ' + result.conditions[0].declarationValue, 'min-width: 30px');

			q.ok(result.conditions[1].isNegated, 'second result node is negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].declarationName + ': ' + result.conditions[1].declarationValue, 'max-width: 60px');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(!value);
		}
	});


	dataSets.push({
		desc: 'disjunction rule',
		rule: '(min-width: 30px) OR (max-width: 60px)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}

				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.DISJUNCTION_NODE, 'result is a disjunction node');
			q.deepEqual(result.conditions.length, 2, 'result has two sub-nodes');

			q.ok(!result.isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].declarationName + ': ' + result.conditions[0].declarationValue, 'min-width: 30px');

			q.ok(!result.isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].declarationName + ': ' + result.conditions[1].declarationValue, 'max-width: 60px');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});

	dataSets.push({
		desc: 'double disjunction rule',
		rule: '(min-width: 30px) OR (max-width: 60px) OR (width: 50px)',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '50px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}


				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.DISJUNCTION_NODE, 'result is a disjunction node');
			q.deepEqual(result.conditions.length, 3, 'result has three sub-nodes');

			q.ok(!result.isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].declarationName + ': ' + result.conditions[0].declarationValue, 'min-width: 30px');

			q.ok(!result.isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].declarationName + ': ' + result.conditions[1].declarationValue, 'max-width: 60px');

			q.ok(!result.isNegated, 'third result node is not negated');
			q.deepEqual(result.conditions[2].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[2].declarationName + ': ' + result.conditions[2].declarationValue, 'width: 50px');


		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});

	dataSets.push({
		desc: 'double disjunction with double conjunction rule',
		rule: '((min-width: 30px) OR (max-width: 60px) OR (width: 50px)) OR ((min-width: 30px) AND (max-width: 60px) AND (width: 50px))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '50px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'AND',
						token: polyfill.TERMINALS.AND
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'AND',
						token: polyfill.TERMINALS.AND
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '50px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}

				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.DISJUNCTION_NODE, 'result is a disjunction node');
			q.deepEqual(result.conditions.length, 2, 'result has two sub-nodes');

			q.ok(!result.conditions[0].isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.DISJUNCTION_NODE, 'first result condition is a disjunction node');
			q.deepEqual(result.conditions[0].conditions.length, 3, 'first result has three sub-nodes');

			q.ok(!result.conditions[0].conditions[0].isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].conditions[0].declarationName + ': ' + result.conditions[0].conditions[0].declarationValue, 'min-width: 30px');

			q.ok(!result.conditions[0].conditions[1].isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].conditions[1].declarationName + ': ' + result.conditions[0].conditions[1].declarationValue, 'max-width: 60px');

			q.ok(!result.conditions[0].conditions[2].isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].conditions[2].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].conditions[2].declarationName + ': ' + result.conditions[0].conditions[2].declarationValue, 'width: 50px');

			q.ok(!result.conditions[1].isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONJUNCTION_NODE, 'second result condition is a conjunction node');
			q.deepEqual(result.conditions[1].conditions.length, 3, 'secong result has three sub-nodes');

			q.ok(!result.conditions[1].conditions[0].isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].conditions[0].declarationName + ': ' + result.conditions[1].conditions[0].declarationValue, 'min-width: 30px');

			q.ok(!result.conditions[1].conditions[1].isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].conditions[1].declarationName + ': ' + result.conditions[1].conditions[1].declarationValue, 'max-width: 60px');

			q.ok(!result.conditions[1].conditions[2].isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].conditions[2].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].conditions[2].declarationName + ': ' + result.conditions[1].conditions[2].declarationValue, 'width: 50px');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});


	dataSets.push({
		desc: 'negated disjunction rule',
		rule: 'NOT ((min-width: 30px) OR (max-width: 60px))',
		tokens: [
					{
						sequence: 'NOT',
						token: polyfill.TERMINALS.NOT
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},

					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}


				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(result.isNegated, 'node is negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.DISJUNCTION_NODE, 'result is a disjunction node');
			q.deepEqual(result.conditions.length, 2, 'result has two sub-nodes');

			q.ok(!result.conditions[0].isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result condition is a condition node');
			q.deepEqual(result.conditions[0].declarationName + ': ' + result.conditions[0].declarationValue, 'min-width: 30px');

			q.ok(!result.conditions[1].isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result condition is a condition node');
			q.deepEqual(result.conditions[1].declarationName + ': ' + result.conditions[1].declarationValue, 'max-width: 60px');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(!value);
		}
	});


	dataSets.push({
		desc: 'individually negated conjunction rule',
		rule: '(NOT (min-width: 30px)) OR (NOT (max-width: 60px))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'NOT',
						token: polyfill.TERMINALS.NOT
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'NOT',
						token: polyfill.TERMINALS.NOT
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '60px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}


				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.DISJUNCTION_NODE, 'result is a disjunction node');
			q.deepEqual(result.conditions.length, 2, 'result has two sub-nodes');

			q.ok(result.conditions[0].isNegated, 'first result node is negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result disjunction is a condition node');
			q.deepEqual(result.conditions[0].declarationName + ': ' + result.conditions[0].declarationValue, 'min-width: 30px');

			q.ok(result.conditions[1].isNegated, 'second result node is negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result disjunction is a condition node');
			q.deepEqual(result.conditions[1].declarationName + ': ' + result.conditions[1].declarationValue, 'max-width: 60px');

		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(!value);
		}
	});


	dataSets.push({
		desc: 'nested condition',
		rule: '(min-width: 30px) OR ((max-width: 40px) AND ((min-width: 50px)))',
		tokens: [
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '30px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'OR',
						token: polyfill.TERMINALS.OR
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'max-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '40px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: 'AND',
						token: polyfill.TERMINALS.AND
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: '(',
						token: polyfill.TERMINALS.OPEN_BRACKET
					},
					{
						sequence: 'min-width',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ':',
						token: polyfill.TERMINALS.DOUBLE_COLON
					},
					{
						sequence: '50px',
						token: polyfill.TERMINALS.RULENAME
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					},
					{
						sequence: ')',
						token: polyfill.TERMINALS.CLOSE_BRACKET
					}

				],
		isValid: true,
		testNodes: function(result) {

			q.ok(result, 'node was returned');
			q.ok(!result.isNegated, 'node is not negated');
			q.deepEqual(result.getType(), polyfill.EXPRESSION_NODES.DISJUNCTION_NODE, 'result is a disjunction node');
			q.deepEqual(result.conditions.length, 2, 'result has two sub-nodes');

			q.ok(!result.conditions[0].isNegated, 'first result node is not negated');
			q.deepEqual(result.conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'first result disjunction is a condition node');
			q.deepEqual(result.conditions[0].declarationName + ': ' + result.conditions[0].declarationValue, 'min-width: 30px');

			q.ok(!result.conditions[1].isNegated, 'second result node is not negated');
			q.deepEqual(result.conditions[1].getType(), polyfill.EXPRESSION_NODES.CONJUNCTION_NODE, 'second result disjunction is a conjunction node');
			q.deepEqual(result.conditions[1].conditions.length, 2, 'second result disjunction has two sub-nodes');

			q.ok(!result.conditions[1].conditions[0].isNegated, 'second result first sub-node is not negated');
			q.deepEqual(result.conditions[1].conditions[0].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result disjunction first sub-node is a condition node');
			q.deepEqual(result.conditions[1].conditions[0].declarationName + ': ' + result.conditions[1].conditions[0].declarationValue, 'max-width: 40px');

			q.ok(!result.conditions[1].conditions[1].isNegated, 'second result second sub-node is not negated');
			q.deepEqual(result.conditions[1].conditions[1].getType(), polyfill.EXPRESSION_NODES.CONDITION_NODE, 'second result disjunction second sub-node is a condition node');
			q.deepEqual(result.conditions[1].conditions[1].declarationName + ': ' + result.conditions[1].conditions[1].declarationValue, 'min-width: 50px');


		},
		testResult: function(result) {
			var value = result.getValue();
			q.ok(value);
		}
	});


	q.module('global object');
	q.test('existence of global object', function() {
		q.ok(typeof polyfill === 'object', 'window.fqPolyfill object exists');
	});
	q.test('method for adding tests', function() {
		q.ok(typeof polyfill.addTest === 'function', 'method for adding tests exists');
		
		var dummy = function() {  };

		polyfill.addTest(dummy);

		q.deepEqual(polyfill.supportChecker.tests[polyfill.supportChecker.tests.length - 1], dummy, 'user can add custom tests');

		polyfill.supportChecker.tests = polyfill.supportChecker.tests.filter(function(func) {
			return (func !== dummy);
		});

	});



	q.module('polyfills');
	q.test('window.CSS.supports method is available', function() {
		q.ok(typeof win.CSS.supports === 'function');
	});


	q.module('tokenizer');
	q.test('existence of tokenizer and it\'s methods', function() {
		q.ok(typeof polyfill.tokenizer === 'object', 'window.fqPolyfill.tokenizer object exists');
		q.ok(typeof polyfill.tokenizer.tokenize === 'function', 'tokenizer has tokenize function');
	});

	q.test('tokenizer behaviour', function() {
		
		var i;

		for(i = 0; i < dataSets.length; i++) {
			q.deepEqual(polyfill.tokenizer.tokenize(dataSets[i].rule), dataSets[i].tokens, 'rule "' + dataSets[i].rule + '" tokenized correctly');
		}
			
	});


	q.module('parser');
	q.test('existence of parser and it\'s methods', function() {
		q.ok(typeof polyfill.parser === 'object', 'window.fqPolyfill.parser object exists');
		q.ok(typeof polyfill.parser.parse === 'function', 'parser has parse function');
	});

	q.test('parser syntax checking', function() {
		
		var i;

		for(i = 0; i < dataSets.length; i++) {

			try {
				polyfill.parser.parse(dataSets[i].tokens);
				if(dataSets[i].isValid) {
					q.ok(true, 'rule "' + dataSets[i].rule + '" parsed correctly');
				}
				else {
					q.ok(false, 'rule "' + dataSets[i].rule + '" is incorrect, but was parsed');
				}
			}
			catch(msg) {
				if(!dataSets[i].isValid) {
					q.ok(true, 'rule "' + dataSets[i].rule + '" thrown parse error correctly');
				}
				else {
					q.ok(false, 'rule "' + dataSets[i].rule + '" is correct, but was not parsed, message: ' + msg);
				}
			}
		}
			
	});

	q.test('parser node building', function() {
		
		var i,
			result;

		for(i = 0; i < dataSets.length; i++) {
			if(dataSets[i].isValid) {
				result = polyfill.parser.parse(dataSets[i].tokens);
				dataSets[i].testNodes(result);
			}
		}

	});



	q.module('fqPolyfill vs Modernizr');
	q.test('test fqPolyfill results against Modernizr test results', function() {

		var i,
			result;

		for(i = 0; i < dataSets.length; i++) {
			if(dataSets[i].isValid) {
				result = polyfill.parser.parse(dataSets[i].tokens);
				dataSets[i].testResult(result);
			}
		}

	});

	q.module('external CSS');
	q.test('load external stylesheets and check if rules are applied', function() {

		var limit = 3,
			performTests = function(i, whenDone) {
				helpers.loadCSS('test-css/' + i, function(e) {
					var linkElem = this;
					setTimeout(function() {
						polyfill.styleFix.link(linkElem);
						setTimeout(function() {
							q.deepEqual(win.getComputedStyle(win.document.querySelector('#test-elem')).marginBottom, i + 'px', 'margin-bottom: ' + i + 'px styles properly applied');

							if(i < limit) {
								performTests(i + 1, whenDone);
							}
							else {
								whenDone();
							}

						}, 100);	
					}, 100);
				});
			};

			q.stop();
			performTests(0, function() {
				q.start();
			});

	});





}(this));
