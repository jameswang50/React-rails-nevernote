export const createNotebook = notebook => (
  $.ajax({
    method: "POST",
    url: "/api/notebooks",
    data: notebook
  })
);

export const fetchAllNotebooks = () => (
  $.ajax({
    method: "GET",
    url: "/api/notebooks"
  })
);

export const deleteNotebook = notebookId => (
  $.ajax({
    method: "DELETE",
    url: `/api/notebooks/${notebookId}`
  })
);
