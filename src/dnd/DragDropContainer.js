import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { MULTI_SELECT } from '../constants/dragDropTypes';

class DragDropContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragIndex: -1,
			hoverIndex: -1
    };
  }

	render () {
		const { connectDropTarget, isOver, canDrop, className } = this.props;
		const allClassNames = classNames(className, { 'Select-drag-drop-item': canDrop && isOver, 'Select-drag-item': !canDrop && isOver });
		return connectDropTarget(
			<div className={allClassNames}>
				{this.props.children}
			</div>
		);
	}
};


DragDropContainer.propTypes = {
  canDrop: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  connectDropTarget: PropTypes.func,
  contextId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),//Unique Identifier for the drag context (parent component which contains the dnd context)
  handleSorting: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

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
