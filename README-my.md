# 1. Author service

## Endpoints

### GET /api/authors
List authors

Query parameters

    {
        firstName: string (optional) - value to search for authors with first name LIKE
        lastName: string (optional) - value to search for authors with last name LIKE
    }

Returns array of authors objects matching the criteria

    [
        {
            id: string -  ID of the author
            firstName: string -  First name of the author
            lastName: string - Last name of the author
        },
    ]

### GET /api/authors/:id
Get author by id

Path parameter

    id - ID of the user we want to get

Returns author object matching the criteria

    {
        id - ID of the author
        firstName - First name of the author
        lastName - Last name of the author
    }

Known errors

    404 - if the author with the specified ID does not exist in storage.

### POST /api/authors
Create author

Data Params

    {
        firstName (required) - First name of the author
        lastName (required) - Last name of the author
    }

Returns author object

    {
        id - ID of the author
        firstName - First name of the author
        lastName - Last name of the author
    }

### PUT /api/authors/:id
Update author

Path parameter

    id - ID of the user we want to update

Data Params

    {
        firstName (optional) - First name of the author
        lastName (optional) - Last name of the author
    }

Returns author object

    {
        id - ID of the author
        firstName - First name of the author
        lastName - Last name of the author
    }

### DELETE /api/authors/:id
Delete author

Path parameter

    id - ID of the user we want to delete

Returns done object

    {
        done: true
    }

# 1. Book service

## Endpoints

### GET /api/books
List books

Query parameters

    {
        title (optional) - value to search for books with title LIKE
    }

Returns array of books objects matching the criteria

    [
        {
            id: ID of the book
            title: Title of the book
            year: Year of the book
            pages: Number of pages of the book
            author: {
                        id: ID of the author of the book
                        firstName: First name of the author of the book
                        lastName: Last name of the author of the book
                    }
        },
    ]

### GET /api/books/:id
Get book by id

Path parameter

    id - ID of the book we want to get

Returns book object matching the criteria

    {
        id: ID of the book
        title: Title of the book
        year: Year of the book
        pages: Number of pages of the book
        author: {
                    id: ID of the author of the book
                    firstName: First name of the author of the book
                    lastName: Last name of the author of the book
                }
    }

Known errors

    404 - if the book with the specified ID does not exist in storage.

### POST /api/books
Create book

Data Params

    {
        title (required) - Title of the book
        year (required) - Year of the book
        pages (required) - Number of pages of the book
        authorID (required) - ID of the author of the book
    }

Returns book object

    {
        id: ID of the book
        title: Title of the book
        year: Year of the book
        pages: Number of pages of the book
        authorId: ID of the author of the book
    }

### PUT /api/books/:id
Update book

Path parameter

    id - ID of the book we want to update

Data Params

    {
        title (optional) - Title of the book
        year (optional) - Year of the book
        pages (optional) - Number of pages of the book
        authorId (optional) - ID of the author of the book
    }

Returns book object

    {
        id: ID of the book
        title: Title of the book
        year: Year of the book
        pages: Number of pages of the book
        authorId: ID of the author of the book
    }

### DELETE /api/books/:id
Delete book

Path parameter

    id - ID of the book we want to delete

Returns done object

    {
        done: true
    }
