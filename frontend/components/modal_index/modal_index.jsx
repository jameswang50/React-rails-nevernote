import React from 'react';
const Modal = require('react-modal');

import ModalIndexHeader from './modal_index_header.jsx';
import ModalIndexItem from './modal_index_item.jsx';
import { modalStyle } from './modal_style.jsx';
import MessageBarContainer from '../message_bar/message_bar_container.js';

class ModalIndex extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.countNotes = this.countNotes.bind(this);
  }

  closeModal() {
    this.props.router.push("/home");
  }

  countNotes(notebookId) {
    const notes = this.props.notes;
    const noteKeys = Object.keys(notes);
    let count = 0;
    noteKeys.forEach(noteId => {
      if (notes[noteId].notebook_id == notebookId) {
        count++;
      }
    });
    return count;
  }

  render() {
    const indexType = this.props.indexType;
    const items = this.props.items;
    const itemKeys = Object.keys(items);

    const itemItems = itemKeys.map(itemId => {
      const count = (indexType === "notebook") ? this.countNotes(itemId) : null;

      return (
        <ModalIndexItem
          key={ itemId }
          indexType={ indexType }
          item={ this.props.items[itemId] }
          count={ count }
          createShortcut={ this.props.createShortcut }
          receiveErrors={ this.props.receiveErrors }
          receiveMessages={ this.props.receiveMessages }
          deleteItem={ this.props.deleteItem }
          router={ this.props.router }
        />
      );
    });

    return (
      <Modal
        isOpen={ this.props.modalOpen }
        onRequestClose={ this.closeModal }
        contentLabel={ `${indexType}-index` }
        style={ modalStyle }>

        <ModalIndexHeader router={ this.props.router } indexType={ indexType } />

        <ul className={ `${indexType}-index-scroll` }>
          { itemItems }
        </ul>

        <MessageBarContainer />
      </Modal>
    );
  }
}

export default ModalIndex;
