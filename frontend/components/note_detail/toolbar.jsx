import React from 'react';

const Toolbar = ({ noteId, createShortcut, deleteNote, router }) => {
  const handleDelete = () => {
    deleteNote(noteId)
      .then(() => router.push("/home"));
  };

  return (
    <nav className="toolbar">
      <i className="fa fa-star-o" onClick={ createShortcut } aria-hidden="true"></i>
      <i className="fa fa-trash" onClick={ handleDelete } aria-hidden="true"></i>
    </nav>
  );
}

export default Toolbar;
