'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = require('./CODE128.js');

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE_C = String.fromCharCode(204);
var CODE_B = String.fromCharCode(205);
var matchSetC = function matchSetC(string) {
	return string.match(new RegExp('^' + _constants.C_CHARS + '*'))[0];
};

var CODE128Fix = function (_CODE) {
	_inherits(CODE128Fix, _CODE);

	function CODE128Fix(string, options) {
		_classCallCheck(this, CODE128Fix);

		var starting = matchSetC(string);
		var bStartingIndex = starting.length;
		var content = _constants.B_START_CHAR + CODE_C + string.substring(0, bStartingIndex);

		var cStartingIndex = bStartingIndex + 3;
		if (!string.substring(bStartingIndex).startsWith(" ")) {
			cStartingIndex = cStartingIndex + 1;
		}
		content = content + CODE_B + string.substring(bStartingIndex, cStartingIndex);
		var remaining = string.substring(cStartingIndex);
		var remainingMatched = matchSetC(remaining);

		content = content + CODE_C + string.substring(cStartingIndex, cStartingIndex + remainingMatched.length);
		if (remainingMatched !== remaining) {
			content = content + CODE_B + string.substring(cStartingIndex + remainingMatched.length);
		}

		return _possibleConstructorReturn(this, (CODE128Fix.__proto__ || Object.getPrototypeOf(CODE128Fix)).call(this, content, options));
	}

	_createClass(CODE128Fix, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.C_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128Fix;
}(_CODE3.default);

exports.default = CODE128Fix;