'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _constantsDragDropTypes = require('../constants/dragDropTypes');

var DragDropItem = _react2['default'].createClass({

	displayName: 'DragDropItem',

	propTypes: {
		children: _react2['default'].PropTypes.any,
		connectDragPreview: _react2['default'].PropTypes.func.isRequired,
		connectDragSource: _react2['default'].PropTypes.func.isRequired,
		isDragging: _react2['default'].PropTypes.bool.isRequired,
		previewHeight: _react2['default'].PropTypes.string,
		previewHtml: _react2['default'].PropTypes.any,
		previewUrl: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.string]),
		previewWidth: _react2['default'].PropTypes.string
	},

	render: function render() {
		var _props = this.props;
		var isDragging = _props.isDragging;
		var connectDragSource = _props.connectDragSource;
		var connectDragPreview = _props.connectDragPreview;
		var previewUrl = _props.previewUrl;
		var previewHtml = _props.previewHtml;

		return connectDragSource(_react2['default'].createElement(
			'div',
			null,
			!isDragging ? this.props.children : false
		));
	}

});

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

exports['default'] = (0, _reactDnd.DragSource)(_constantsDragDropTypes.MULTI_SELECT, dragSource, collect)(DragDropItem);
module.exports = exports['default'];