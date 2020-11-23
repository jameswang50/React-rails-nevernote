# Schema Information

## Users:

| columns          | validations   						  | index | datatype |
|------------------|----------------------------|-------|----------|
| :id              | null: false, unique: true  |       | integer  |
| :username				 | null: false, unique: true  | index | string   |
| :session_token	 | null: false						  	|	index |	string   |
|	:password_digest | null: false						  	|				|	string   |


## Notes:

| columns 		 | validations								| index | datatype | foreign keys    |
|--------------|----------------------------|-------|----------|-----------------|
| :id          | null: false, unique: true  |       | integer  |                 |
|	:title 			 | null: false              	|	index | string   |                 |
|	:body 			 |														|				|	text     |                 |
|	:author_id   | null: false								|	index | integer  | users table     |
|	:notebook_id |														|	index | integer  | notebooks table |


## Notebooks:

| columns 	 | validations               | index | datatype | foreign keys |
|------------|---------------------------|-------|----------|--------------|
| :id        | null: false, unique: true |       | integer  |              |
|	:title  	 | null: false, unique: true | index | string   |              |
|	:author_id | null: false 							 | index | integer  | users table  |


## Tags:

| columns    | validations               | index | datatype |
|------------|---------------------------|-------|----------|
| :id        | null: false, unique: true |       | integer  |
| :name      | null: false, unique: true | index | string   |
| :author_id | null: false               | index | integer  |


## Taggings:

| columns  | validations               | index | datatype | foreign keys |
|----------|---------------------------|-------|----------|--------------|
| :id      | null: false, unique: true |       | integer  |              |
|	:tag_id  | null: false               | index | integer  | tags table   |
|	:note_id | null: false               | index | integer  | notes table  |

## Shortcuts:

| columns    | validations               | index | datatype |
|------------|---------------------------|-------|----------|
| :id        | null: false, unique: true |       | integer  |
| :name      | null: false, unique: true |       | string   |
| :route     | null: false, unique: true |       | string   |
| :author_id | null: false               | index | integer  |
