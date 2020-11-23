import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NoteDetail from '../note_detail/note_detail.jsx';
import { createNote, updateNote } from '../../actions/notes_actions.js';
import { fetchAllNotebooks } from '../../actions/notebooks_actions.js';
import { fetchAllTags } from '../../actions/tags_actions.js';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  notebooks: state.notebooks,
  formType: 'new'
});

const mapDispatchToProps = (dispatch) => ({
  createNote: note => dispatch(createNote(note)),
  updateNote: note => dispatch(updateNote(note)),
  fetchAllNotebooks: () => dispatch(fetchAllNotebooks()),
  fetchAllTags: () => dispatch(fetchAllTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NoteDetail));
