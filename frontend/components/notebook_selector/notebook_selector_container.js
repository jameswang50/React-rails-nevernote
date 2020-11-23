import { connect } from 'react-redux';

import NotebookSelector from './notebook_selector.jsx';

const mapStateToProps = (state) => ({
  notebooks: state.notebooks
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: ownProps.onChange,
  currentNotebook: ownProps.currentNotebook
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookSelector);
