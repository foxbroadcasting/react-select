'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDnd = require('react-dnd');

var _dragDropTypes = require('../constants/dragDropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragDropItem = function DragDropItem(_ref) {
	var isDragging = _ref.isDragging,
	    connectDragSource = _ref.connectDragSource,
	    connectDragPreview = _ref.connectDragPreview,
	    previewUrl = _ref.previewUrl,
	    previewHtml = _ref.previewHtml,
	    children = _ref.children;
	return connectDragSource(_react2.default.createElement(
		'div',
		null,
		!isDragging ? children : false
	));
};

DragDropItem.propTypes = {
	children: _propTypes2.default.any,
	connectDragPreview: _propTypes2.default.func.isRequired,
	connectDragSource: _propTypes2.default.func.isRequired,
	isDragging: _propTypes2.default.bool.isRequired,
	previewHeight: _propTypes2.default.string,
	previewHtml: _propTypes2.default.any,
	previewUrl: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
	previewWidth: _propTypes2.default.string
};

var dragSource = {
	beginDrag: function beginDrag(props) {
		return {
			index: props.index,
			contextId: props.contextId
		};
	},
	endDrag: function endDrag(props, monitor) {
		if (!monitor.didDrop()) {
			return;
		}
	}
};

function collect(connect, monitor) {
	return {
		// Call this function inside render()
		// to let React DnD handle the drag events:
		connectDragSource: connect.dragSource(),
		// You can ask the monitor about the current drag state:
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview()
	};
}

exports.default = (0, _reactDnd.DragSource)(_dragDropTypes.MULTI_SELECT, dragSource, collect)(DragDropItem);