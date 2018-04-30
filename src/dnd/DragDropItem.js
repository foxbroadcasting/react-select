import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { MULTI_SELECT } from '../constants/dragDropTypes';

const DragDropItem = createClass({

	displayName: 'DragDropItem',

	propTypes: {
		children: PropTypes.any,
		connectDragPreview: PropTypes.func.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		previewHeight: PropTypes.string,
		previewHtml: PropTypes.any,
		previewUrl: PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.string,
		]),
		previewWidth: PropTypes.string,
	},

	render() {
		const { isDragging, connectDragSource, connectDragPreview, previewUrl, previewHtml } = this.props;
		return connectDragSource(
			<div>
				{!isDragging ? this.props.children : false}
			</div>
		);
	}

});

const dragSource = {
	beginDrag(props) {
		return {
			index: props.index,
			contextId: props.contextId
		};
	},

	endDrag(props, monitor) {
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

export default DragSource(MULTI_SELECT, dragSource, collect)(DragDropItem);
