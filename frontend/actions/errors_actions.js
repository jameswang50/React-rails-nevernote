export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveErrors = (errors, formName) => ({
	type: RECEIVE_ERRORS,
	errors,
	formName
});
