import * as APIUtil from '../util/notes_api_util.js';
import { receiveErrors } from './errors_actions.js';

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

export const receiveNotes = notes => ({
  type: RECEIVE_NOTES,
  notes
});

export const receiveNote = note => ({
  type: RECEIVE_NOTE,
  note
});

export const removeNote = noteId => ({
  type: REMOVE_NOTE,
  noteId
});

export const createNote = note => dispatch => (
  APIUtil.createNote(note)
    .then(note => dispatch(receiveNote(note)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON, "main")))
);

export const fetchAllNotes = () => dispatch => (
  APIUtil.fetchAllNotes()
    .then(notes => dispatch(receiveNotes(notes)))
);

export const fetchNote = noteId => dispatch => (
  APIUtil.fetchNote(noteId)
    .then(note => dispatch(receiveNote(note)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON, "main")))
);

export const updateNote = note => dispatch => (
  APIUtil.updateNote(note)
    .then(note => dispatch(receiveNote(note)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON, "main")))
);

export const deleteNote = noteId => dispatch => (
  APIUtil.deleteNote(noteId)
    .then(() => dispatch(removeNote(noteId)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON, "main")))
);
