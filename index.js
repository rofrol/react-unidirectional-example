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

import { pacomoTransformer } from './pacomo'

var NavItem = ({user, nav_style_mobile, nav_options, strings, ...other}) => {
	return (
		<div className={{'small': nav_style_mobile, 'large': !nav_style_mobile}}>
			<strong className={{'highlight': user.new_login}}>
				{ strings.welcome_prefix } { user.name ? user.name : user.email }
			</strong>

			{do {
				if(user.nav_options) {
					<ul>
						{ user.nav_options.map(function(nav_option, i) {
							return (
								<li key={i} className={{'even': i%2 == 0}}>
									<a href={nav_option.url}>
										{nav_option.url}
									</a>
								</li>
							)
						}) }
					</ul>
				}
			}}
		</div>
	)
};

NavItem = pacomoTransformer(NavItem);

var nav = {
	"user": {
		new_login: true,
		name: "Joe",
		email: "joe@example.com",
		nav_options: [
			{ url: "http://example.com" },
			{ url: "http://example2.com" }
		]
	},
	"strings": {
		"welcome_prefix": "Hello"
	}
};
ReactDOM.render(<NavItem {...nav} />, document.querySelector('#app2'));
