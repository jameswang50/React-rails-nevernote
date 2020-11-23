import merge from 'lodash/merge';

const noteSelector = (notes = {}, pathname) => {
  const noteKeys = Object.keys(notes);
  const newNotes = {};

  if (pathname.startsWith("/notebook/")) {
    const notebookId = pathname.split("/")[2];
    noteKeys.forEach(key => {
      if (notes[key].notebook_id == notebookId) {
        newNotes[key] = notes[key];
      }
    });
    return newNotes;
  }
  else if (pathname.startsWith("/tag/")) {
    const tagId = pathname.split("/")[2];
    noteKeys.forEach(key => {
      if (notes[key].tag_ids.includes(parseInt(tagId))) {
        newNotes[key] = notes[key];
      }
    });
    return newNotes;
  }
  else {
    return notes;
  }
}

export default noteSelector;
