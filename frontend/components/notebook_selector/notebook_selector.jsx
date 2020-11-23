import React from 'react';

class NotebookSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notebooks = this.props.notebooks;
    const notebookKeys = Object.keys(notebooks);

    const notebookItems = notebookKeys.map(notebookId => {
      let className = "";
      if (notebookId == this.props.currentNotebook) {
        className = "active-text";
      }

      return (
        <li className="notebook-selector-item" onClick={ this.props.onChange(notebookId) } key={ notebookId }>
          <div className={ `${className} notebook-selector-text` }>
            <p>{ notebooks[notebookId].title }</p>
          </div>
        </li>
      );
    });

    return (
      <ul className="selector-scroll">
        <li className="selector-header">
          <div className="selector-header-text">
            <p>NOTEBOOKS</p>
          </div>
        </li>

        { notebookItems }
      </ul>
    );
  }
}

export default NotebookSelector;
