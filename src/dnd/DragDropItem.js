import React from 'react';
import { DragSource } from 'react-dnd';
import { MULTI_SELECT } from '../constants/dragDropTypes';

const DragDropItem = React.createClass({

	displayName: 'DragDropItem',

	propTypes: {
		children: React.PropTypes.any,
		connectDragPreview: React.PropTypes.func.isRequired,
		connectDragSource: React.PropTypes.func.isRequired,
		isDragging: React.PropTypes.bool.isRequired,
		previewHeight: React.PropTypes.string,
		previewHtml: React.PropTypes.any,
		previewUrl: React.PropTypes.oneOfType([
			React.PropTypes.bool,
			React.PropTypes.string,
		]),
		previewWidth: React.PropTypes.string,
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
