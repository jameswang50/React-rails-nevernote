export const createShortcut = shortcut => (
  $.ajax({
    method: "POST",
    url: "/api/shortcuts",
    data: shortcut
  })
);

export const fetchAllShortcuts = () => (
  $.ajax({
    method: "GET",
    url: "/api/shortcuts"
  })
);

export const deleteShortcut = shortcutId => (
  $.ajax({
    method: "DELETE",
    url: `/api/shortcuts/${shortcutId}`
  })
);
