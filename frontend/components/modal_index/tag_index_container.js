import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ModalIndex from '../modal_index/modal_index.jsx';
import { deleteTag } from '../../actions/tags_actions.js';
import { createShortcut } from '../../actions/shortcuts_actions.js';
import { receiveErrors } from '../../actions/errors_actions.js';
import { receiveMessages } from '../../actions/messages_actions.js';

const mapStateToProps = (state, ownProps) => ({
  indexType: "tag",
  items: state.tags,
  notes: state.notes,
  modalOpen: (ownProps.location.pathname === "/tags")
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: tagId => dispatch(deleteTag(tagId)),
  createShortcut: shortcut => dispatch(createShortcut(shortcut)),
  receiveErrors: (errors, name) => dispatch(receiveErrors(errors, name)),
  receiveMessages: messages => dispatch(receiveMessages(messages))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalIndex));
