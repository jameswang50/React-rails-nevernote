import { connect } from 'react-redux';

import NoteDetail from './note_detail.jsx';
import { fetchNote, updateNote, deleteNote } from '../../actions/notes_actions.js';
import { createShortcut } from '../../actions/shortcuts_actions.js';
import { receiveErrors } from '../../actions/errors_actions.js';
import { receiveMessages } from '../../actions/messages_actions.js';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.currentUser;
  const currentNote = state.notes[ownProps.params.noteId] || { id: 0, title: "", body: "" };

  let notebookTitle = "";
  if (currentNote.notebook_id && state.notebooks[currentNote.notebook_id]) {
    notebookTitle = state.notebooks[currentNote.notebook_id].title;
  }

  return ({
    currentUser,
    currentNote,
    notebookTitle,
    formType: 'edit'
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchNote: () => dispatch(fetchNote(ownProps.params.noteId)),
  updateNote: note => dispatch(updateNote(note)),
  deleteNote: noteId => dispatch(deleteNote(noteId)),
  createShortcut: shortcut => dispatch(createShortcut(shortcut)),
  receiveErrors: (errors, name) => dispatch(receiveErrors(errors, name)),
  receiveMessages: messages => dispatch(receiveMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
