import React from 'react';

const StatelessInput = ({type, ...other}) =>
	<div>
		<input {...other} type={type} />
	</div>;

export default StatelessInput;
