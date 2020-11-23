import { connect } from 'react-redux';

import TagSelector from './tag_selector.jsx';

const mapStateToProps = (state) => ({
  tags: state.tags,
  currentTags: state.currentNote.tag_ids
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: ownProps.onChange
});

export default connect(mapStateToProps, mapDispatchToProps)(TagSelector);
