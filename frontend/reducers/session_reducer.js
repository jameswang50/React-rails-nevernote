import React from 'react';
import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER, LOGOUT } from '../actions/session_actions.js';

const nullUser = Object.freeze({
  id: null,
  username: null
});

const SessionReducer = (state = nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        id: action.currentUser.id,
        username: action.currentUser.username
      };
    case LOGOUT:
      return merge({}, nullUser);
    default:
      return state;
  }
};

export default SessionReducer;
