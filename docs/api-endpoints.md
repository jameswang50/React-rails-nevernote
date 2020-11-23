# API Endpoints

## HTML Endpoints:

### root:
	- `GET /`

## JSON Endpoints:

### users:

- `POST /api/users`

### session:

- `POST /api/session`
- `DELETE /api/session`

### notes:

- `POST /api/notes`
- `GET /api/notes`
	+ filtered by a selector on the frontend
- `GET /api/notes/:id`
- `PATCH /api/notes/:id`
- `DELETE /api/notes/:id`

### notebooks:

- `POST /api/notebooks`
- `GET /api/notebooks`
	+ shows list of all notebooks
- `DELETE /api/notebooks/:id`

### tags

- `POST /api/tags`
- `GET /api/tags`
	+ shows list of all tags
- `DELETE /api/tags/:id`

### shortcuts

- `POST /api/tags`
- `GET /api/tags`
	+ shows list of all shortcuts
- `DELETE /api/tags/:id`
