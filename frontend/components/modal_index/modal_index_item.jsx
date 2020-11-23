import React from 'react';
import { Link } from 'react-router';

import DeleteConfirmation from '../delete_confirmation.jsx';
import { toggleStar } from '../../util/star_util.js';

class ModalIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOpen: false
    }
    this.addShortcut = this.addShortcut.bind(this);
    this.toggleDeletePage = this.toggleDeletePage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderDeleteConfirmation = this.renderDeleteConfirmation.bind(this);
    this.deleteShortcut = this.deleteShortcut.bind(this);
  }

  addShortcut() {
    const indexType = this.props.indexType;
    const path = `/${indexType}/${this.props.item.id}`;
    const name = (indexType == "notebook") ? this.props.item.title : this.props.item.name;
    const shortcut = {
      name: name,
      route: path,
      author_id: this.props.item.author_id
    };
    this.props.createShortcut({ shortcut })
      .then(() => this.props.router.push(path))
      .then(() => this.props.receiveMessages([`Shortcut for ${shortcut.name} created.`]))
      .fail(() => this.props.receiveErrors([`Shortcut for ${shortcut.name} already exists.`], "main"));
  }

  toggleDeletePage() {
    if (this.state.deleteOpen) {
      this.setState({ deleteOpen: false });
    }
    else {
      this.setState({ deleteOpen: true });
    }
  }

  handleDelete() {
    this.props.deleteItem(this.props.item.id)
      .then(() => this.props.router.push("/home"));
  }

  renderDeleteConfirmation() {
    if (this.state.deleteOpen) {
      const indexType = this.props.indexType;
      const name = (indexType == "notebook") ? this.props.item.title : this.props.item.name;
      return (
        <DeleteConfirmation
          name={ name }
          type={ indexType }
          handleDelete={ this.handleDelete }
          handleCancel={ this.toggleDeletePage }>
        </DeleteConfirmation>
      );
    }
  }

  deleteShortcut() {
    this.props.deleteItem(this.props.item.id);
  }

  render() {
    const indexType = this.props.indexType;
    const item = this.props.item;
    const name = (indexType === "notebook") ? item.title : item.name;
    const count = this.props.count;

    const star = (indexType === "tag") ? (
      <i className="fa fa-star-o"
        onClick={ this.addShortcut }
        aria-hidden="true">
      </i>
      ) : (
      <i className="fa fa-star-o"
        onClick={ this.addShortcut }
        onMouseEnter={ toggleStar }
        onMouseLeave={ toggleStar }
        aria-hidden="true">
      </i>
    );

    const tools = (indexType === "shortcut") ? (
      <i className="fa fa-minus-circle"
        onClick={ this.deleteShortcut }
        aria-hidden="true">
      </i>
      ) : (
      <nav className={ `${indexType}-index-tools` }>
        { star }
        <i className="fa fa-trash" onClick={ this.toggleDeletePage } aria-hidden="true"></i>
      </nav>
    );

    let content = (<p>{ name }</p>);
    if (indexType === "notebook") {
      content = (
        <div>
          <h5>{ name }</h5>
          <p>{ count } notes</p>
        </div>
      );
    }
    if (indexType === "shortcut") {
      content = (
        <div>
          <i className="fa fa-file-text-o" aria-hidden="true"></i>
          <p>{ item.name }</p>
        </div>
      );
    }

    return (
      <div>
        <li className={ `${indexType}-index-item` }>
          { tools }
          <Link to={ item.route || `/${indexType}/${item.id}` }>
            <div className={ `${indexType}-index-text` }>
              { content }
            </div>
          </Link>
        </li>

        { this.renderDeleteConfirmation() }
      </div>
    );
  }
}

export default ModalIndexItem;
