Mar. 16:
- Got error "notebook must exist" when trying to make a new note w/ out notebook id, even though there was no validation for notebook id at db level or model level.
- Rails 5 belongs_to is automatically validated

- Validating for uniqueness of notebook title, but different users should be able to create notebooks w/ same title

Mar. 17:
- Asynchronous error, in component did mount for note index, was trying to set the state to store the index of the first note after fetching all the notes, but was trying to set state before this.props.notes were defined
- Solved with a .then, used debugger to check what this.state was
- Tested a console.log for .then, realized it would work

Mar. 20:
- Error with updating the note before rendering the new note
- Had to set a default state for currentNote in the container because was rendering asyncronously before fetching all notes from database

Mar 21:
- Buttons were disappearing when I clicked them
- Inspected in dev tools, had a strange class name
- Adding "active-button" to current class name, which specified icon type, so non-existent icon class

- Passing a function, onToggle, down to different components, from note detail component to inline/block style controls, to style button
- Had already handled e, was returning a function that took e but really it needed to just be called with the style type (a string)
