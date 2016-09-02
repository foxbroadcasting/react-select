import React from 'react';
import { DragSource } from 'react-dnd';

const ValueSortItem = React.createClass({

	displayName: 'ValueSortItem',

	propTypes: {
		children: React.PropTypes.any,
		connectDragSource: React.PropTypes.func.isRequired,
		connectDragPreview: React.PropTypes.func.isRequired,
		isDragging: React.PropTypes.bool.isRequired,
		previewHeight: React.PropTypes.string,
		previewHtml: React.PropTypes.any,
		previewWidth: React.PropTypes.string,
		previewUrl: React.PropTypes.oneOfType([
			React.PropTypes.bool,
			React.PropTypes.string,
		]),
	},

	getDefaultProps () {
		return {
			previewHtml: false,
			previewHeight: '200px',
			previewWidth: '200px',
			previewUrl: false
		};
	},

	render() {
		//const url = `url(${this.props.url}) no-repeat`;
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

export default DragSource('valueItem', dragSource, collect)(ValueSortItem);
