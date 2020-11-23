import React from 'react';

const NoteIndexHeader = ({ count, header }) => (
  <div className="note-index-header">
    <h3>{ header }</h3>
    <p>{ count } notes</p>
  </div>
);

export default NoteIndexHeader;
