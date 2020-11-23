import React from 'react';

import NoteIndexHeader from './note_index_header.jsx';
import NoteIndexItem from './note_index_item.jsx';

import noteSelector from '../selectors.js';

class NoteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.showFirstNote = this.showFirstNote.bind(this);
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    if (path.startsWith("/note/") || path === "/home") {
      this.props.fetchAllNotes()
        .then(() => this.showFirstNote(path));
    }
    else {
      this.props.fetchAllNotes();
    }
  }

  componentWillReceiveProps(nextProps) {
    const path = this.props.location.pathname;
    if (path.startsWith("/notebook/") || path.startsWith("/tag/")) {
      if (!this.props.params.noteId) {
        this.showFirstNote(path);
      }
    }
  }

  showFirstNote(path) {
    const notes = noteSelector(this.props.notes, path);
    const noteId = Object.keys(notes)[0];
    const newPath = this.getNewPath(path, noteId);

    if (noteId) {
      this.props.router.push(newPath);
    }
  }

  getNewPath(path, noteId) {
    let newPath = `/note/${noteId}`;
    if (path.startsWith("/notebook") || path.startsWith("/tag")) {
      newPath = path + newPath;
    }
    return newPath;
  }

  render() {
    const path = this.props.location.pathname;
    const notes = noteSelector(this.props.notes, path);
    const noteKeys = Object.keys(notes);
    const noteItems = noteKeys.map(key => (
      <NoteIndexItem
        key={ key }
        note={ notes[key] }
        createShortcut={ this.props.createShortcut }
        receiveErrors={ this.props.receiveErrors }
        receiveMessages={ this.props.receiveMessages }
        deleteNote={ this.props.deleteNote }
        path={ this.props.location.pathname }
        router={ this.props.router }
      />
    ));

    let header = "NOTES";
    if (path.startsWith("/tag/")) {
      const tagId = this.props.params.tagId;
      header = this.props.tags[tagId].name.toUpperCase();
    }
    if (path.startsWith("/notebook/")) {
      const notebookId = this.props.params.notebookId;
      header = this.props.notebooks[notebookId].title.toUpperCase();
    }

    return (
      <div>
        <section className="note-index">
          <NoteIndexHeader count={ noteKeys.length } header={ header }/>
          <ul className="note-index-scroll">
            { noteItems }
          </ul>
        </section>
      </div>
    );
  }
}

export default NoteIndex;
