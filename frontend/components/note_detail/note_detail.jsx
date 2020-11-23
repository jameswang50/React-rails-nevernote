import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, ContentState, ContentBlock, convertFromRaw, convertToRaw, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js';

import { blockRenderMap, CheckableListItem, CheckableListItemBlock, CheckableListItemUtils, CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';

import Toolbar from './toolbar.jsx';
import { styleMap, blockStyleFn, InlineStyleControls, BlockStyleControls } from './formatbar.jsx';
import NotebookSelectorContainer from '../notebook_selector/notebook_selector_container.js';
import TagSelectorContainer from '../tag_selector/tag_selector_container.js';
import MessageBarContainer from '../message_bar/message_bar_container.js';

class NoteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
      notebookId: null,
      tags: [],
      notebookSelectorOpen: false,
      tagSelectorOpen: false
    }
    this.saveNote = this.saveNote.bind(this);

    this.logJson = this.logJson.bind(this);  // for creating seed data

    this.changeBody = editorState => this.setState({ editorState });
    this.changeTitle = this.changeTitle.bind(this);
    this.changeNotebook = this.changeNotebook.bind(this);
    this.changeTags = this.changeTags.bind(this);

    this.focus = () => this.refs.editor.focus();
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleBlockStyle = this.toggleBlockStyle.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.addShortcut = this.addShortcut.bind(this);

    this.toggleSelector = this.toggleSelector.bind(this);
    this.renderNotebookSelector = this.renderNotebookSelector.bind(this);
    this.renderTagSelector = this.renderTagSelector.bind(this);

    this.blockRendererFn = this.blockRendererFn.bind(this);
  }

  componentWillMount() {
    if (this.props.formType === "edit") {
      this.props.fetchNote();
    }
  }

  componentDidMount() {
    this.setEditorState(this.props.currentNote);
    if (this.props.formType === "new") {
      this.props.fetchAllNotebooks();
      this.props.fetchAllTags();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType === "edit") {
      if (this.props.currentNote.id !== nextProps.currentNote.id) {
        this.props.fetchNote();
        this.setEditorState(nextProps.currentNote);
      }
      if (this.props.params.noteId !== nextProps.params.noteId) {
        this.saveNote();
      }
    }
  }

  componentWillUnmount() {
    this.saveNote();
  }

  setEditorState(note) {
    if (note && note.title) {
      this.setState({ title: note.title });
    }
    if (note && note.body) {
      const content = convertFromRaw(JSON.parse(note.body));
      this.setState({ editorState: EditorState.createWithContent(content) });
    }
    if (note && note.notebook_id) {
      this.setState({ notebookId: note.notebook_id });
    }
    if (note && note.tags) {
      this.setState({ tags: note.tags });
    }
  }

  saveNote() {
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    const note = {
      id: this.props.params.noteId,
      title: this.state.title,
      body: JSON.stringify(rawContent),
      notebook_id: this.state.notebookId,
      tag_ids: this.state.tags
    };
    this.props.updateNote(note)
      .then(updatedNote => this.setEditorState(updatedNote));
  }

  // for creating seed data
  logJson() {
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    const json = JSON.stringify(rawContent);
    console.log(json);
  }

  // for creating seed data
  logJsonButton() {
    return (
      <input onClick={ this.logJson } type="button" value="Log JSON" />
    );
  }

  changeTitle(e) {
    this.setState({ title: e.target.value });
  }

  changeNotebook(value) {
    return (e) => (
      this.setState({
        notebookId: parseInt(value),
        notebookSelectorOpen: false
      }, () => {
        const note = {
          id: this.props.params.noteId,
          notebook_id: this.state.notebookId
        };
        if (this.props.formType === "edit") {
          this.props.updateNote(note);
        }
      })
    );
  }

  changeTags(tagIds) {
    this.setState({
      tags: tagIds
    }, () => {
      const note = {
        id: this.props.params.noteId,
        tag_ids: this.state.tags
      };
      if (this.props.formType === "edit") {
        this.props.updateNote(note);
      }
    });
  }

  toggleInlineStyle(type) {
    this.changeBody(RichUtils.toggleInlineStyle(this.state.editorState, type));
  }

  toggleBlockStyle(type) {
    this.changeBody(RichUtils.toggleBlockType(this.state.editorState, type));
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.changeBody(newState);
      return "handled";
    }
    else {
      return "not-handled";
    }
  }

  handleCancel() {
    this.props.router.push("/home");
  }

  handleSubmit(e) {
    e.preventDefault();
    const rawContent = convertToRaw(this.state.editorState.getCurrentContent());
    const note = {
      title: this.state.title,
      body: JSON.stringify(rawContent),
      author_id: this.props.currentUser.id,
      notebook_id: this.state.notebookId,
      tag_ids: this.state.tags
    };
    this.props.createNote({ note })
      .then(() => this.props.router.push("/home"));
  }

  addShortcut() {
    const shortcut = {
      name: this.state.title,
      route: `/note/${this.props.params.noteId}`,
      author_id: this.props.currentUser.id
    };
    this.props.createShortcut({ shortcut })
      .then(() => this.props.receiveMessages([`Shortcut for ${shortcut.name} created.`]))
      .fail(() => this.props.receiveErrors([`Shortcut for ${shortcut.name} already exits.`], "main"));
  }

  toggleSelector(selector) {
    const otherSelector = (selector == "notebookSelectorOpen") ? "tagSelectorOpen" : "notebookSelectorOpen";
    return ((e) => {
      if (this.state[selector]) {
        this.setState({ [selector]: false });
      }
      else {
        this.setState({
          [selector]: true,
          [otherSelector]: false
        });
      }
    });
  }

  renderNotebookSelector() {
    if (this.state.notebookSelectorOpen) {
      return (
        <NotebookSelectorContainer onChange={ this.changeNotebook } currentNotebook={ this.state.notebookId } />
      );
    }
  }

  renderTagSelector() {
    if (this.state.tagSelectorOpen) {
      return (
        <TagSelectorContainer onChange={ this.changeTags } />
      );
    }
  }

  renderButtons(formType) {
    if (formType === "new") {
      return (
        <div className="new-note-buttons">
          <button className="cancel-note" onClick={ this.handleCancel }>Cancel</button>
          <button className="submit-note" onClick={ this.handleSubmit }>Done</button>
        </div>
      );
    }
  }

  blockRendererFn(contentBlock) {
    if (contentBlock.getType() === CHECKABLE_LIST_ITEM) {
      return {
        component: CheckableListItem,
        props: {
          onChangeChecked: () => this.changeBody(
            CheckableListItemUtils.toggleChecked(this.state.editorState, contentBlock)
          ),
          checked: !!contentBlock.getData().get('checked')
        }
      };
    }
  }

  render() {
    const formType = this.props.formType;
    const onDelete = (formType === "new") ? this.handleCancel : this.props.deleteNote;

    return (
      <section className={ `note-detail-section ${formType}` }>
        <Toolbar
          noteId={ this.props.params.noteId }
          createShortcut={ this.addShortcut }
          deleteNote={ onDelete }
          router={ this.props.router }
        />

        { this.renderButtons(formType) }

        <nav className="format-bar">
          <button className="notebook-selector-button" onClick={ this.toggleSelector("notebookSelectorOpen") }>
            <i className="fa fa-book" aria-hidden="true"></i>
            <p>{ this.props.notebookTitle }</p>
          </button>

          { this.renderNotebookSelector() }

          <div className="style-controls"><p></p></div>

          <button className="tag-selector-button" onClick={ this.toggleSelector("tagSelectorOpen") }>
            <i className="fa fa-tag" aria-hidden="true"></i>
          </button>

          { this.renderTagSelector() }

          <div className="style-controls"><p></p></div>

          <InlineStyleControls
            editorState={ this.state.editorState }
            onToggle={ this.toggleInlineStyle }
          />

          <BlockStyleControls
            editorState={ this.state.editorState }
            onToggle={ this.toggleBlockStyle }
          />
        </nav>

        <div className="note-detail-text">
          <h2><input
            onChange={ this.changeTitle }
            type="text"
            value={ this.state.title }
            placeholder="Title your note">
          </input></h2>

        <div className="focus-area" onClick={ this.focus }>
            <Editor
              onChange={ this.changeBody }
              handleKeyCommand={ this.handleKeyCommand }
              editorState={ this.state.editorState }
              customStyleMap={ styleMap }
              blockStyleFn={ blockStyleFn }
              blockRendererFn={ this.blockRendererFn }
              blockRenderMap={ DefaultDraftBlockRenderMap.merge(blockRenderMap) }
              ref="editor"
            />
          </div>
        </div>

        <MessageBarContainer />
      </section>
    );
  }
}

export default NoteDetail;
