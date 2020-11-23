import { connect } from 'react-redux';

import MessageBar from './message_bar.jsx';

const mapStateToProps = (state) => ({
  errors: state.errors.main,
  messages: state.messages
});

export default connect(mapStateToProps, null)(MessageBar);
