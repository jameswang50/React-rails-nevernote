import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Home from './home.jsx';
import { logout } from '../../actions/session_actions.js';
import { receiveErrors } from '../../actions/errors_actions.js';

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  receiveErrors: (errors, name) => dispatch(receiveErrors(errors, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
