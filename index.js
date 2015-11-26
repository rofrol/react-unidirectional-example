"use strict";

// https://www.reddit.com/r/javascript/comments/332v73/is_anyone_using_es6_in_a_large_project_hows_it/cqh2u7i
import hex from 'hex-rgb';

const rgb = (str) => hex(str).map(x => x / 255);

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

// http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
// stopgap until ES7 allows property initializers
// https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html
class BaseComponent extends React.Component {
	_bind(...methods) {
		methods.forEach((method) => this[method] = this[method].bind(this));
	}
}

// https://facebook.github.io/react/docs/two-way-binding-helpers.html
class NoLink extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			message: '#abde13',
			someStyle: {
				color: 'white',
				backgroundColor: '#C594C5'
			}
		};
		this._bind('handleChange');
	}

	handleChange(event) {
		this.setState({message: event.target.value, someStyle: {color: 'white', backgroundColor: event.target.value}});
	}

	render() {
		var message = this.state.message;
		return (
			<div>
				<input style={this.state.someStyle} type="text" value={message} onChange={this.handleChange}/>
				<input type="text" value={rgb(message)} readOnly/>
			</div>
		)
	}
}

ReactDOM.render(
	<NoLink txt="some text"/>,
	document.getElementById('app')
);


/* Raw react.js */

import ContactItem from './ContactItem';
import ContactForm from './ContactForm';
import ContactView from './ContactView';

/* Constants */

var CONTACT_TEMPLATE = {name: '', email: '', description: '', errors: null};

/* Actions */

function updateNewContact(contact) {
	setState({newContact: contact});
}

function submitNewContact() {
	var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});

	if (contact.name && contact.email) {
		var changes = {newContact: contact};
		if (Object.keys(contact.errors).length === 0)
			Object.assign(changes, {contacts: state.contacts.concat(contact)});
		setState(changes);
	}
}

/* Model */

var state = {};

function setState(changes) {
	Object.assign(state, changes);

	ReactDOM.render(
		React.createElement(ContactView, Object.assign({}, state, {
			onNewContactChange: updateNewContact,
			onNewContactSubmit: submitNewContact
		})),
		document.querySelector('#raw-reactjs')
	);
}

setState({
	contacts: [
		{key: 1, name: 'John Doe', email: 'john.doe@example.com', description: 'Some guy'},
		{key: 2, name: 'Joe Pesci', email: 'joe.pesci@example.com'},
		{key: 3, name: 'Bigfoot Silva'}
	],
	newContact: Object.assign({}, CONTACT_TEMPLATE)
});

/* example of unidirectional flow */

import StatelessInput from './StatelessInput';

var inputState = {};

function updateInput(e) {
	setInputState({value: e.target.value + 'aaa'})
}

// pass value as an empty string to make it a controlled component and thus use unidirectional flow
var emptyInput = {type: 'text', value: '', onChange: updateInput};

function setInputState(changes) {
	Object.assign(inputState, changes);
	ReactDOM.render(<StatelessInput {...inputState} />, document.querySelector('#read-only-input'));
}

setInputState(emptyInput);
