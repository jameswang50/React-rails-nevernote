export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const receiveMessages = (messages) => ({
	type: RECEIVE_MESSAGES,
	messages
});
