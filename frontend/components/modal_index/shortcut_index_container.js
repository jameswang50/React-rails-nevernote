import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ModalIndex from '../modal_index/modal_index.jsx';
import { deleteShortcut } from '../../actions/shortcuts_actions.js';

const mapStateToProps = (state, ownProps) => ({
  indexType: "shortcut",
  items: state.shortcuts,
  notes: null,
  modalOpen: (ownProps.location.pathname === "/shortcuts")
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: shortcutId => dispatch(deleteShortcut(shortcutId)),
  createShortcut: null,
  receiveErrors: null,
  receiveMessages: null
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalIndex));
