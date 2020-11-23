import React from 'react';

class MessageBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      type: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length > 0) {
      this.setState({
        shown: true,
        type: "errors"
      });
    }
    else if (nextProps.messages.length > 0) {
      this.setState({
        shown: true,
        type: "messages"
      });
    }

    setTimeout(() => this.setState({
      shown: false
    }), 1500);
  }

  render() {
    if (this.state.shown) {
      const className = this.state.type;
      const text = (className === "errors") ? this.props.errors[0] : this.props.messages[0];

      return (
        <div className={ `message-bar ${className}` }>
          <p>{ text }</p>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }
}

export default MessageBar;
