import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ModalIndex from '../modal_index/modal_index.jsx';
import { deleteNotebook } from '../../actions/notebooks_actions.js';
import { createShortcut } from '../../actions/shortcuts_actions.js';
import { receiveErrors } from '../../actions/errors_actions.js';
import { receiveMessages } from '../../actions/messages_actions.js';

const mapStateToProps = (state, ownProps) => ({
  indexType: "notebook",
  items: state.notebooks,
  notes: state.notes,
  modalOpen: (ownProps.location.pathname === "/notebooks")
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: notebookId => dispatch(deleteNotebook(notebookId)),
  createShortcut: shortcut => dispatch(createShortcut(shortcut)),
  receiveErrors: (errors, name) => dispatch(receiveErrors(errors, name)),
  receiveMessages: messages => dispatch(receiveMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalIndex));
