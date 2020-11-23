import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AuthForm from './auth_form.jsx';
import { login, signup } from '../../actions/session_actions.js';

const mapStateToProps = (state) => ({
  loggedIn: !!state.currentUser.username,
  errors: state.errors
});

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = (formType === "signup") ? signup : login;
  return {
    processForm: user => dispatch(processForm(user)),
    login: user => dispatch(login(user)),
    formType
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthForm));
