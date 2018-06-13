import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { MULTI_SELECT } from '../constants/dragDropTypes';

const DragDropItem = ({ isDragging, connectDragSource, connectDragPreview, previewUrl, previewHtml, children }) =>
	connectDragSource(
		<div>
			{!isDragging ? children : false}
		</div>
	);


DragDropItem.propTypes = {
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
};

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
