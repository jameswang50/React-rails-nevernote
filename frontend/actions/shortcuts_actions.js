import * as APIUtil from '../util/shortcuts_api_util.js';

export const RECEIVE_SHORTCUTS = "RECEIVE_SHORTCUTS";
export const RECEIVE_SHORTCUT = "RECEIVE_SHORTCUT";
export const REMOVE_SHORTCUT = "REMOVE_SHORTCUT";

export const receiveShortcuts = shortcuts => ({
  type: RECEIVE_SHORTCUTS,
  shortcuts
});

export const receiveShortcut = shortcut => ({
  type: RECEIVE_SHORTCUT,
  shortcut
});

export const removeShortcut = shortcutId => ({
  type: REMOVE_SHORTCUT,
  shortcutId
});

export const createShortcut = shortcut => dispatch => (
  APIUtil.createShortcut(shortcut)
    .then(shortcut => dispatch(receiveShortcut(shortcut)))
);

export const fetchAllShortcuts = () => dispatch => (
  APIUtil.fetchAllShortcuts()
    .then(shortcuts => dispatch(receiveShortcuts(shortcuts)))
);

export const deleteShortcut = shortcutId => dispatch => (
  APIUtil.deleteShortcut(shortcutId)
    .then(() => dispatch(removeShortcut(shortcutId)))
);
