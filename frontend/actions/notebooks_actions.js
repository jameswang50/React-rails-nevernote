import * as APIUtil from '../util/notebooks_api_util.js';
import { receiveErrors } from './errors_actions.js';

export const RECEIVE_NOTEBOOKS = 'RECEIVE_NOTEBOOKS';
export const RECEIVE_NOTEBOOK = 'RECEIVE_NOTEBOOK';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';

export const receiveNotebooks = notebooks => ({
  type: RECEIVE_NOTEBOOKS,
  notebooks
});

export const receiveNotebook = notebook => ({
  type: RECEIVE_NOTEBOOK,
  notebook
});

export const removeNotebook = notebookId => ({
  type: REMOVE_NOTEBOOK,
  notebookId
});


export const createNotebook = notebook => dispatch => (
  APIUtil.createNotebook(notebook)
    .then(notebook => dispatch(receiveNotebook(notebook)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON, "main")))
);

export const fetchAllNotebooks = () => dispatch => (
  APIUtil.fetchAllNotebooks()
    .then(notebooks => dispatch(receiveNotebooks(notebooks)))
);

export const deleteNotebook = notebookId => dispatch => (
  APIUtil.deleteNotebook(notebookId)
    .then(() => dispatch(removeNotebook(notebookId)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON, "main")))
);
