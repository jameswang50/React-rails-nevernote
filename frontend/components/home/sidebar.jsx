import React from 'react';
const Modal = require('react-modal');

import { logoutModalStyle } from './logout_modal_style.jsx';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.redirect = this.redirect.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.featureMessage = this.featureMessage.bind(this);
  }

  toggleModal() {
    const path = this.props.router.location.pathname;
    if (path === "/shortcuts" || path === "/notebooks" || path === "/tags") {
      this.props.router.push("/home");
    }

    if (this.state.modalOpen) {
      this.setState({ modalOpen: false });
    }
    else {
      this.setState({ modalOpen: true });
    }
  }

  redirect(path) {
    return (e) => {
      e.preventDefault();
      this.props.router.push(path);
    }
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({
      modalOpen: false
    }, () => (
      this.props.logout()
        .then(() => this.props.router.push("/"))
    ));
  }

  featureMessage() {
    this.props.receiveErrors(["Feature coming soon."], "main");
  }

  render() {
    const username = this.props.user.username;

    return (
      <aside className="sidebar">
        <img className="logo" src="https://res.cloudinary.com/dq5kxnx9d/image/upload/e_grayscale,o_63,r_5/v1490316135/logo_o2ibft.png" alt="logo"/>

        <nav>
          <div className="nav-circle" onClick={ this.redirect("/new-note") }><i className="fa fa-plus" aria-hidden="true"></i></div>
          <div className="nav-circle" onClick={ this.featureMessage }><i className="fa fa-search" aria-hidden="true"></i></div>
        </nav>

        <nav className="green-nav">
          <div className="nav-circle-2" onClick={ this.redirect("/shortcuts") }><i className="fa fa-star" aria-hidden="true"></i></div>
          <div className="nav-circle-2" onClick={ this.redirect("/home") }><i className="fa fa-file-text" aria-hidden="true"></i></div>
          <div className="nav-circle-2" onClick={ this.redirect("/notebooks") }><i className="fa fa-book" aria-hidden="true"></i></div>
          <div className="nav-circle-2" onClick={ this.redirect("/tags") }><i className="fa fa-tag" aria-hidden="true"></i></div>
        </nav>

        <div className="account-square">
          <div className="account-button nav-circle-2" onClick={ this.toggleModal }><i className="fa fa-cog" aria-hidden="true"></i></div>
        </div>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.toggleModal }
          contentLabel="logout-modal"
          style={ logoutModalStyle }
          className="logout-modal">

          <div className="logout-header">
            <h4 className="username">{ username }</h4>
          </div>

          <div className="logout-button" onClick={ this.handleLogout }>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <p>Log out</p>
          </div>
        </Modal>
      </aside>
    );
  }
}

export default Sidebar;
