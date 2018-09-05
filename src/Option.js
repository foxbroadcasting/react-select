import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Option extends React.Component {

	constructor(props) {
		super(props);

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}


	blockEvent (event) {
		event.preventDefault();
		event.stopPropagation();
		if ((event.target.tagName !== 'A') || !('href' in event.target)) {
			return;
		}
		if (event.target.target) {
			window.open(event.target.href, event.target.target);
		} else {
			window.location.href = event.target.href;
		}
	}

	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}

	handleMouseEnter (event) {
		this.onFocus(event);
	}

	handleMouseMove (event) {
		this.onFocus(event);
	}

	handleTouchEnd(event){
		// Check if the view is being dragged, In this case
		// we don't want to fire the click event (because the user only wants to scroll)
		if (this.dragging) return;

		this.handleMouseDown(event);
	}

	handleTouchMove (event) {
		// Set a flag that the view is being dragged
		this.dragging = true;
	}

	handleTouchStart (event) {
		// Set a flag that the view is not being dragged
		this.dragging = false;
	}

	onFocus (event) {
		if (!this.props.isFocused) {
			this.props.onFocus(this.props.option, event);
		}
	}

	render () {
		var { option, instancePrefix, optionIndex } = this.props;
		var className = classNames(this.props.className, option.className);

		return option.disabled ? (
			<div className={className}
				onMouseDown={this.blockEvent}
				onClick={this.blockEvent}>
				{this.props.children}
			</div>
		) : (
			<div className={this.props.isUniqueSelected ? className : null}>
				{this.props.isUniqueSelected &&
					(<span className="Select-unique-selected-icon-wrapper">
						<svg className="Select-unique-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
							<g><path d="M9 16.17l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"></path></g>
						</svg>
					</span>
				)}
				<div className={this.props.isUniqueSelected ? 'Select-option is-unique-selected': className}
					style={option.style}
					role="option"
					onMouseDown={this.handleMouseDown}
					onMouseEnter={this.handleMouseEnter}
					onMouseMove={this.handleMouseMove}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
					onTouchEnd={this.handleTouchEnd}
					id={instancePrefix + '-option-' + optionIndex}
					title={option.title}>
					{this.props.children}
				</div>
			</div>
		);
	}
};

Option.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,             // className (based on mouse position)
	instancePrefix: PropTypes.string.isRequired,  // unique prefix for the ids (used for aria)
	isDisabled: PropTypes.bool,              // the option is disabled
	isFocused: PropTypes.bool,               // the option is focused
	isSelected: PropTypes.bool,              // the option is selected
	isUniqueSelected: PropTypes.bool,        // the option as a String is selected
	onFocus: PropTypes.func,                 // method to handle mouseEnter on option element
	onSelect: PropTypes.func,                // method to handle click on option element
	onUnfocus: PropTypes.func,               // method to handle mouseLeave on option element
	option: PropTypes.object.isRequired,     // object that is base for that option
	optionIndex: PropTypes.number,           // index of the option, used to generate unique ids for aria
};

export default Option;
