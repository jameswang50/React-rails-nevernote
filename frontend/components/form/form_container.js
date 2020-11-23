import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Form from './form.jsx';
import { createNotebook } from '../../actions/notebooks_actions.js';
import { createTag } from '../../actions/tags_actions.js';

const mapStateToProps = (state) => ({
  author_id: state.currentUser.id
});

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = (formType === "new-notebook") ? createNotebook : createTag;
  return {
    processForm: object => dispatch(processForm(object)),
    formType
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
