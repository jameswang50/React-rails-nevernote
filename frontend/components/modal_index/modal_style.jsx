import React from 'react';

export const modalStyle = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
    zIndex          : 10
  },
  content : {
    position        : 'fixed',
    top             : -2,
    left            : '74px',
    width           : '454.5px',
    bottom          : -2,
    border          : '2px solid #ccc',
    padding         : 0,
    zIndex          : 11
  }
};
