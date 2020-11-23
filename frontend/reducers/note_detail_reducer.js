import React from 'react';

import { RECEIVE_NOTE } from '../actions/notes_actions.js';

const NoteDetailReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_NOTE:
      return action.note;
    default:
      return state;
  }
};

export default NoteDetailReducer;
