import React from 'react';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';

const ValueSortContainer = React.createClass({

	displayName: 'ValueSortContainer',

	propTypes: {
		canDrop: React.PropTypes.bool,
		children: React.PropTypes.any,
		connectDropTarget: React.PropTypes.func,
		handleSorting: React.PropTypes.func.isRequired,
		isOver: React.PropTypes.bool.isRequired,
		contextId: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string
		]),//Unique Identifier for the drag context (parent component which contains the dnd context)
		className: React.PropTypes.string
	},

	getDefaultProps () {
		return {
			className: ''
		};
	},

	getInitialState () {
		return {
			dragIndex: -1,
			hoverIndex: -1
		};
	},

	render () {
		const { connectDropTarget, isOver, canDrop, className } = this.props;
		const allClassNames = classNames(className, { 'Sort-item--CanDrop': canDrop && isOver, 'Sort-item--CantDrop': !canDrop && isOver });
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
		if(typeof handleSorting === 'function') {
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

export default DropTarget('valueItem', target, collect)(ValueSortContainer);
