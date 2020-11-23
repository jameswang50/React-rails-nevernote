# Component Hierarchy

**Welcome**
- LandingPage

**Root**
- App

**AuthFormContainer**
- AuthForm

**HomeContainer**
- Home
 	+ Sidebar
	+ NoteIndexContainer
		- NoteIndex
			+ NoteIndexHeader
			+ NoteIndexItem
  + MessageBar

**NoteIndexContainer**
- NoteIndex
	+ NoteIndexHeader
	+ NoteIndexItem

**NoteDetailContainer**
- NoteDetail
	+ Toolbar
	+ Formatbar
		- NotebookSelector
    - TagSelector
    - StyleButton

**ShortcutIndexContainer**
- ShortcutIndex
	+ ShortcutIndexHeader
  + ShortcutIndexItem

**NotebookIndexContainer**
- NotebookIndex
  + NotebookIndexHeader
	  - Search
	+ NotebookIndexItem

**TagIndexContainer**
- TagIndex
  + TagIndexHeader
	  - Search
	+ TagIndexItem

**NewNoteFormContainer**
- NoteDetail

**FormContainer**
- Form

**SearchPageContainer** // Bonus
- SearchPage
	+ SearchSelect

**SearchResultsContainer** // Bonus
- SearchResultsHeader
- NoteIndex
	+ NoteIndexItem
		- NoteDetailContainer
			+ Formatbar
				- NotebookSelector
        - StyleButton
			+ NoteDetail

**DeleteConfirmation**


# Routes

|Path                           | Component                |
|-------------------------------|--------------------------|
| /welcome                      | LandingPage              |
| /                             | Root                     |
| /signup                       | AuthFormContainer        |
| /login                        | AuthFormContainer        |
| /home                         | HomeContainer            |
| /note/:noteId                 | NoteDetailContainer      |
| /shortcuts                    | ShortcutIndexContainer   |
| /notebooks                    | NotebookIndexContainer   |
| /tags                         | TagIndexContainer        |
| /notebook/:notebookId         | HomeContainer            |
| /tag/:tagId                   | HomeContainer            |
| /notebook/:notebookId         | NoteDetailContainer      |
| /tag/:tagId/note/:noteId      | NoteDetailContainer      |
| /new-note                     | NewNoteFormContainer     |
| /new-notebook                 | FormContainer            |
| /new-tag                      | FormContainer            |
| /search                       | SearchPageContainer      |
| /search-results               | SearchResultsContainer   |
