import { combineReducers } from 'redux';

import SessionReducer from './session_reducer.js';
import ErrorsReducer from './errors_reducer.js';
import MessagesReducer from './messages_reducer.js';
import NotesReducer from './notes_reducer.js';
import NotebooksReducer from './notebooks_reducer.js';
import TagsReducer from './tags_reducer.js';
import ShortcutsReducer from './shortcuts_reducer.js';
import NoteDetailReducer from './note_detail_reducer.js';

const RootReducer = combineReducers({
	currentUser: SessionReducer,
	errors: ErrorsReducer,
	messages: MessagesReducer,
	notes: NotesReducer,
	notebooks: NotebooksReducer,
	tags: TagsReducer,
	shortcuts: ShortcutsReducer,
	currentNote: NoteDetailReducer
});

export default RootReducer;
