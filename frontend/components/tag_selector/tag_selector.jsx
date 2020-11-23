import React from 'react';
import without from 'lodash/without';

class TagSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      tags: this.props.currentTags
    });
  }

  handleClick(e) {
    e.preventDefault();
    const tagId = parseInt(e.currentTarget.value);
    let newTags = this.state.tags;
    if (newTags.includes(tagId)) {
      newTags = without(newTags, tagId);
    }
    else {
      newTags = newTags.concat(parseInt(tagId));
    }

    this.setState({
      tags: newTags
    }, () => (
      this.props.onChange(this.state.tags)
    ));
  }

  render() {
    const tags = this.props.tags;
    const tagKeys = Object.keys(tags);

    const tagItems = tagKeys.map(tagId => {
      let className = "";
      if (this.state.tags.includes(parseInt(tagId))) {
        className = "active-tag";
      }

      return (
        <button
          className={`${className} tag-index-text selector`}
          onClick={ this.handleClick }
          value={ tagId }
          key={ tagId }>

          <p>{ tags[tagId].name }</p>
        </button>
      );
    });

    return (
      <ul className="tag selector-scroll">
        <li className="selector-header">
          <div className="tag selector-header-text">
            <p>TAGS</p>
          </div>
        </li>

        { tagItems }
      </ul>
    );
  }
}

export default TagSelector;
