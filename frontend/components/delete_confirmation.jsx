import React from 'react';

const DeleteConfirmation = ({ name, type, handleDelete, handleCancel }) => {
  const header = `DELETE ${type.toUpperCase()}`;

  return (
    <div className="delete-confirmation">
      <i className="fa fa-trash" aria-hidden="true"></i>
      <h2 className="new-header">{ header }</h2>

      <h2 className="confirmation-text">{ `Are you sure you want to delete ${name}?`}</h2>

      <div className="new-buttons">
        <button className="new-button submit" onClick={ handleDelete }>Delete</button>
        <button className="new-button cancel" onClick={ handleCancel }>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
