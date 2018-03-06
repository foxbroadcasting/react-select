import React from 'react';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { MULTI_SELECT } from '../constants/dragDropTypes';

const DragDropContainer = React.createClass({

	displayName: 'DragDropContainer',

	propTypes: {
		canDrop: React.PropTypes.bool,
		children: React.PropTypes.any,
		className: React.PropTypes.string,
		connectDropTarget: React.PropTypes.func,
		contextId: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]),//Unique Identifier for the drag context (parent component which contains the dnd context)
		handleSorting: React.PropTypes.func.isRequired,
		isOver: React.PropTypes.bool.isRequired,
	},

	getInitialState () {
		return {
			dragIndex: -1,
			hoverIndex: -1
		};
	},

	render () {
		const { connectDropTarget, isOver, canDrop, className } = this.props;
		const allClassNames = classNames(className, { 'Select-drag-drop-item': canDrop && isOver, 'Select-drag-item': !canDrop && isOver });
		return connectDropTarget(
			<div className={allClassNames}>
				{this.props.children}
			</div>
		);
	}

});

const target = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return item.contextId === props.contextId;
	},

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		component.setState({ dragIndex, hoverIndex });
	},

	drop(props, monitor , component) {
		const { handleSorting } = props;
		const { state } = component;
		if (typeof handleSorting === 'function') {
			handleSorting(state.dragIndex, state.hoverIndex);
		}
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	};
}

export default DropTarget(MULTI_SELECT, target, collect)(DragDropContainer);
