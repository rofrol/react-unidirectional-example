import React from 'react';

const StatelessInput = ({type, ...other}) =>
	// ...other has to be before type, so type set in other won't overwrite type
	<div>
		<input {...other} type={type} />
	</div>;

export default StatelessInput;
