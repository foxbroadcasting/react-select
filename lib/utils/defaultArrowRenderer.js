'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = arrowRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown,
	    isUnique = _ref.isUnique;

	if (isUnique) {
		return _react2.default.createElement(
			'span',
			{
				onMouseDown: onMouseDown
			},
			_react2.default.createElement(
				'svg',
				{ viewBox: '0 0 24 24', preserveAspectRatio: 'xMidYMid meet' },
				_react2.default.createElement(
					'g',
					null,
					_react2.default.createElement('path', { d: 'M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z' })
				)
			)
		);
	} else {
		return _react2.default.createElement('span', {
			className: 'Select-arrow',
			onMouseDown: onMouseDown
		});
	}
};

arrowRenderer.propTypes = {
	isUnique: _propTypes2.default.bool,
	onMouseDown: _propTypes2.default.func
};