import React from 'react';

import Sidebar from './sidebar.jsx';
import NoteIndexContainer from '../note_index/note_index_container.js';
import MessageBarContainer from '../message_bar/message_bar_container.js';

const Home = ({ currentUser, logout, receiveErrors, router, children }) => (
  <div>
    <Sidebar logout={ logout } receiveErrors={ receiveErrors } user={ currentUser } router={ router } />
    <NoteIndexContainer />
    { children }
    <MessageBarContainer />
  </div>
);

export default Home;
