import React from 'react';
import PropTypes from 'prop-types';

export default function arrowRenderer ({ onMouseDown, isOpen }) {
	return (
		<span
			onMouseDown={onMouseDown}
		>
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        { isOpen ?
          <g><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6" /></g>
          :
          <g><path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" /></g>
        }
      </svg>
    </span>
	);
};

arrowRenderer.propTypes = {
	onMouseDown: PropTypes.func,
};
