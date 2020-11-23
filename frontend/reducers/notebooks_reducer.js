import React from 'react';
import merge from 'lodash/merge';

import { RECEIVE_NOTEBOOKS, RECEIVE_NOTEBOOK, REMOVE_NOTEBOOK } from '../actions/notebooks_actions.js';

const NotebooksReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  switch(action.type) {
    case RECEIVE_NOTEBOOKS:
      return action.notebooks;
    case RECEIVE_NOTEBOOK:
      newState[action.notebook.id] = action.state;
      return newState;
    case REMOVE_NOTEBOOK:
      delete newState[action.notebookId];
      return newState;
    default:
      return state;
  }
};

export default NotebooksReducer;
