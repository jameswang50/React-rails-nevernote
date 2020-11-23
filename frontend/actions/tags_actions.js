import * as APIUtil from '../util/tags_api_util.js';
import { receiveErrors } from './errors_actions.js';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';

export const receiveTags = tags => ({
  type: RECEIVE_TAGS,
  tags
});

export const receiveTag = tag => ({
  type: RECEIVE_TAG,
  tag
});

export const removeTag = tagId => ({
  type: REMOVE_TAG,
  tagId
});

export const createTag = tag => dispatch => (
  APIUtil.createTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON, "main")))
);

export const fetchAllTags = () => dispatch => (
  APIUtil.fetchAllTags()
    .then(tags => dispatch(receiveTags(tags)))
);

export const deleteTag = tagId => dispatch => (
  APIUtil.deleteTag(tagId)
    .then(() => dispatch(removeTag(tagId)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON, "main")))
);
