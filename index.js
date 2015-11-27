"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

/* Example of unidirectional flow */

/* Constants */

// pass value as an empty string to make it a controlled component and thus use unidirectional flow
var EMPTY_INPUT = {type: 'text', value: ''};

/* Components */

const StatelessInput = ({type, ...other}) =>
	// ...other has to be before type, so type set in other won't overwrite type
	<div>
		<input {...other} type={type} />
	</div>;

/* Actions */

function updateInput(e) {
	setState({value: e.target.value + 'aaa'})
}

/* Model */
var state = Object.assign(EMPTY_INPUT, {onChange: updateInput});

function setState(changes) {
	Object.assign(state, changes);
	ReactDOM.render(<StatelessInput {...state} />, document.querySelector('#app'));
}

setState(state);
