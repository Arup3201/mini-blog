# A minimum blogging platform

## **Technologies**

- *Frontend*: ReactJS
- *Backend*: NodeJS, Express
- *Database*: PostgreSQL

## **DB Models**

### *users*

#### Columns

- `id`: string
- `username`: string
- `email`: string
- `password`: string
- `created_at`: timestamp with time zone

#### Constraints

- Primary Key: `id`
- Unique: `username`, `email`
- Not Null: `username`, `email`, `password`

> `created_at` is system generated.

### *posts*

#### Columns

- `id`: string
- `created_at`: timestamp with time zone
- `title`: string
- `body`: string
- `author`: string

#### Constraints

- Primary Key: `id`
- Foreign Key: `author` references `users(id)`
- Not Null: `title`, `body`

> `created_at` is system generated.

### *comments*

#### Columns

- `id`: string
- `created_at`: timestamp with time zone
- `body`: string
- `author`: string
- `post`: string

#### Constraints

- Primary Key: `id`
- Foreign Key: `author` references `users(id)`, `post` references `posts(id)`
- Not Null: `body`

> `created_at` is system generated.

## **API Routes**

### *users*

#### `/register` 

Description: creates a new user in the platform

Method: POST

Payload: username, email and password

```json
{
    "username": "Johm Smith", 
    "email": "john@example.com", 
    "password": "123456"
}
```

#### `/login`

Description: log an existing user in the platform

Method: POST

Payload: username, password

```json
{
    "username": "Johm Smith", 
    "password": "123456"
}
```

#### `/users/:id` 

Description: get details for user with id `id`

Method: GET

### *posts*

#### `/posts/all`

Description: get all the posts in the platform

Method: GET

#### `/posts/create`

Description: create a new post

Method: POST

Payload: post title, post content and author

```json
{
    "title": "ABC", 
    "content": "ABC is a great post", 
    "author": "user123" // user id
}
```

#### `/posts/:id`

Description: get the content of a post with id `id`

Method: GET

### *comments*

#### `/comments/:post_id/all`

Description: get all the comments for the post with id `post_id`

Method: GET

#### `/comments/:post_id/create`

Description: create a new comment on the post with id `post_id`

Method: POST

Payload: comment content, author

```json
{
    "content": "this is a comment", 
    "author": "user123" // user id
}
```