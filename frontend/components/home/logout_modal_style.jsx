import React from 'react';

export const logoutModalStyle = {
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
    left            : '50px',
    bottom          : '5px',
    width           : '350px',
    height          : '200px',
    backgroundColor : '#FFFFFF',
    border          : '1px solid #E5E5E5',
    borderRadius    : '3px',
    padding         : 0,
    zIndex          : 11,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }
};
