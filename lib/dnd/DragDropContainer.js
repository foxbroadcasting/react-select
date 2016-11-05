'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDnd = require('react-dnd');

var _constantsDragDropTypes = require('../constants/dragDropTypes');

var DragDropContainer = _react2['default'].createClass({

	displayName: 'DragDropContainer',

	propTypes: {
		canDrop: _react2['default'].PropTypes.bool,
		children: _react2['default'].PropTypes.any,
		className: _react2['default'].PropTypes.string,
		connectDropTarget: _react2['default'].PropTypes.func,
		contextId: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]), //Unique Identifier for the drag context (parent component which contains the dnd context)
		handleSorting: _react2['default'].PropTypes.func.isRequired,
		isOver: _react2['default'].PropTypes.bool.isRequired
	},

	getInitialState: function getInitialState() {
		return {
			dragIndex: -1,
			hoverIndex: -1
		};
	},

	render: function render() {
		var _props = this.props;
		var connectDropTarget = _props.connectDropTarget;
		var isOver = _props.isOver;
		var canDrop = _props.canDrop;
		var className = _props.className;

		var allClassNames = (0, _classnames2['default'])(className, { 'Select-drag-drop-item': canDrop && isOver, 'Select-drag-item': !canDrop && isOver });
		return connectDropTarget(_react2['default'].createElement(
			'div',
			{ className: allClassNames },
			this.props.children
		));
	}

});

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

exports['default'] = (0, _reactDnd.DropTarget)(_constantsDragDropTypes.MULTI_SELECT, target, collect)(DragDropContainer);
module.exports = exports['default'];