'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDnd = require('react-dnd');

var _dragDropTypes = require('../constants/dragDropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragDropContainer = function (_React$Component) {
	_inherits(DragDropContainer, _React$Component);

	function DragDropContainer(props) {
		_classCallCheck(this, DragDropContainer);

		var _this = _possibleConstructorReturn(this, (DragDropContainer.__proto__ || Object.getPrototypeOf(DragDropContainer)).call(this, props));

		_this.state = {
			dragIndex: -1,
			hoverIndex: -1
		};
		return _this;
	}

	_createClass(DragDropContainer, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    connectDropTarget = _props.connectDropTarget,
			    isOver = _props.isOver,
			    canDrop = _props.canDrop,
			    className = _props.className;

			var allClassNames = (0, _classnames2.default)(className, { 'Select-drag-drop-item': canDrop && isOver, 'Select-drag-item': !canDrop && isOver });
			return connectDropTarget(_react2.default.createElement(
				'div',
				{ className: allClassNames },
				this.props.children
			));
		}
	}]);

	return DragDropContainer;
}(_react2.default.Component);

;

DragDropContainer.propTypes = {
	canDrop: _propTypes2.default.bool,
	children: _propTypes2.default.any,
	className: _propTypes2.default.string,
	connectDropTarget: _propTypes2.default.func,
	contextId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]), //Unique Identifier for the drag context (parent component which contains the dnd context)
	handleSorting: _propTypes2.default.func.isRequired,
	isOver: _propTypes2.default.bool.isRequired
};

var target = {
	canDrop: function canDrop(props, monitor) {
		var item = monitor.getItem();
		return item.contextId === props.contextId;
	},
	hover: function hover(props, monitor, component) {
		var dragIndex = monitor.getItem().index;
		var hoverIndex = props.index;
		component.setState({ dragIndex: dragIndex, hoverIndex: hoverIndex });
	},
	drop: function drop(props, monitor, component) {
		var handleSorting = props.handleSorting;
		var state = component.state;

		if (typeof handleSorting === 'function') {
			handleSorting(state.dragIndex, state.hoverIndex);
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
}

exports.default = (0, _reactDnd.DropTarget)(_dragDropTypes.MULTI_SELECT, target, collect)(DragDropContainer);