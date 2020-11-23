import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Editor, EditorState, ContentState, convertFromRaw, getPlainText } from 'draft-js';

import DeleteConfirmation from '../delete_confirmation.jsx';
import { toggleStar } from '../../util/star_util.js';

class NoteIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOpen: false
    }
    this.addShortcut = this.addShortcut.bind(this);
    this.toggleDeletePage = this.toggleDeletePage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderDeleteConfirmation = this.renderDeleteConfirmation.bind(this);
  }

  addShortcut() {
    const shortcut = {
      name: this.props.note.title,
      route: `/note/${this.props.note.id}`,
      author_id: this.props.note.author_id
    };
    this.props.createShortcut({ shortcut })
      .then(() => this.props.receiveMessages([`Shortcut for ${shortcut.name} created.`]))
      .fail(() => this.props.receiveErrors([`Shortcut for ${shortcut.name} already exists.`], "main"));
  }

  toggleDeletePage() {
    if (this.state.deleteOpen) {
      this.setState({ deleteOpen: false }, () => {
        this.props.router.push(`/note/${this.props.note.id}`)
      });
    }
    else {
      this.props.router.push("/home");
      this.setState({ deleteOpen: true });
    }
  }

  handleDelete() {
    this.props.deleteNote(this.props.note.id)
      .then(() => this.props.router.push("/home"));
  }

  renderDeleteConfirmation() {
    if (this.state.deleteOpen) {
      return (
        <DeleteConfirmation
          name={ this.props.note.title }
          type="note"
          handleDelete={ this.handleDelete }
          handleCancel={ this.toggleDeletePage }>
        </DeleteConfirmation>
      );
    }
  }

  render() {
    const note = this.props.note;
    const path = this.props.path;
    const content = convertFromRaw(JSON.parse(note.body));
    const snipit = content.getPlainText().slice(0, 125).concat("...");

    const tools = (
      <nav className="note-index-tools">
        <i className="fa fa-star-o" onClick={ this.addShortcut } onMouseEnter={ toggleStar} onMouseLeave={ toggleStar } aria-hidden="true"></i>
        <i className="fa fa-trash" onClick={ this.toggleDeletePage } aria-hidden="true"></i>
      </nav>
    );

    let link = `/note/${note.id}`;
    if ((path.startsWith("/notebook/")) || (path.startsWith("/tag/"))) {
      const pathStart = path.split("/").slice(0, 3).join("/");
      link = pathStart + link;
    }

    return (
      <div>
        <li className="note-index-item">
          { tools }
          <Link to={ link }>
            <div className="note-index-text">
              <h5>{ note.title }</h5>
              <p>{ snipit }</p>
            </div>
          </Link>
        </li>

        { this.renderDeleteConfirmation() }
      </div>
    );
  }
}

export default NoteIndexItem;
