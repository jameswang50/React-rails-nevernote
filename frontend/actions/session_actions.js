import * as APIUtil from '../util/session_api_util.js';
import { receiveErrors } from './errors_actions.js';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT = 'LOGOUT';

export const receiveCurrentUser = currentUser => ({
	type: RECEIVE_CURRENT_USER,
	currentUser
});

export const receiveLogout = () => ({
	type: LOGOUT
})

export const signup = user => dispatch => (
	APIUtil.signup(user)
		.then(currentUser => dispatch(receiveCurrentUser(currentUser)))
		.fail(errors => dispatch(receiveErrors(errors.responseJSON, "signup")))
);

export const login = user => dispatch => (
	APIUtil.login(user)
		.then(currentUser => dispatch(receiveCurrentUser(currentUser)))
		.fail(errors => dispatch(receiveErrors(errors.responseJSON, "login")))
);

export const logout = () => dispatch => (
	APIUtil.logout()
		.then(() => dispatch(receiveLogout()))
		.fail(errors => dispatch(receiveErrors(errors.responseJSON, "logout")))
);
