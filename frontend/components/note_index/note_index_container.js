import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NoteIndex from './note_index.jsx';
import { fetchAllNotes, deleteNote } from '../../actions/notes_actions.js';
import { createShortcut } from '../../actions/shortcuts_actions.js';
import { receiveErrors } from '../../actions/errors_actions.js';
import { receiveMessages } from '../../actions/messages_actions.js';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  notes: state.notes,
  notebooks: state.notebooks,
  tags: state.tags
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllNotes: () => dispatch(fetchAllNotes()),
  deleteNote: noteId => dispatch(deleteNote(noteId)),
  createShortcut: shortcut => dispatch(createShortcut(shortcut)),
  receiveErrors: (errors, name) => dispatch(receiveErrors(errors, name)),
  receiveMessages: messages => dispatch(receiveMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NoteIndex));
