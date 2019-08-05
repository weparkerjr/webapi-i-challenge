// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());



// ROUTES------------------------------------------------------------


//| POST   | /api/users     | Creates a user using the information sent inside the `request body`.       

// server.post('/api/users', (req, res) => {
  
//     const users = req.body;
  
//     Users.add(users)
//       .then(user => {
//         res.status(201).json(user);
//       })
//       .catch(error => {
//         res.status(500).json({ message: 'error adding the hub' });
//       });
//   });


// When the client makes a `POST` request to `/api/users`:

// - If the request body is missing the `name` or `bio` property:

//  - cancel the request.
//  - respond with HTTP status code `400` (Bad Request).
//  - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

//- If the information about the _user_ is valid:

//  - save the new _user_ the the database.
//  - return HTTP status code `201` (Created).
//  - return the newly created _user document_.

//- If there's an error while saving the _user_:
//  - cancel the request.
//  - respond with HTTP status code `500` (Server Error).
//  - return the following JSON object: `{ error: "There was an error while saving the user to the database" }`.





// DONE-----------------------------------------------------------
//| GET    | /api/users     | Returns an array of all the user objects contained in the database.      

server.get('/api/users', (req, res) => {

    Users.find()
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({ message: 'The users information could not be retrieved' });
      })
  });
// DONE-----------------------------------------------------------
  











//| GET    | /api/users/:id | Returns the user object with the specified `id`.             



server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
  
    Users.findById(userId)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'The user with the specified ID does not exist' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'The user information could not be retrieved' });
      })  
});


//When the client makes a `GET` request to `/api/users/:id`:

//- If the _user_ with the specified `id` is not found:

//  - return HTTP status code `404` (Not Found).
//  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

//- If there's an error in retrieving the _user_ from the database:
//  - cancel the request.
//  - respond with HTTP status code `500`.
//  - return the following JSON object: `{ error: "The user information could not be retrieved." }`.





//| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                                            |



// When the client makes a `DELETE` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the // ///specified ID does not exist." }`.

// - If there's an error in removing the _user_ from the database:
//   - cancel the request.
//  - respond with HTTP status code `500`.
//  - return the following JSON object: `{ error: "The user could not be removed" }`.






//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |



//When the client makes a `PUT` request to `/api/users/:id`:

//- If the _user_ with the specified `id` is not found:

//  - return HTTP status code `404` (Not Found).
//  - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

//- If the request body is missing the `name` or `bio` property:

//  - cancel the request.
//  - respond with HTTP status code `400` (Bad Request).
//  - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

//- If there's an error when updating the _user_:

//  - cancel the request.
//  - respond with HTTP status code `500`.
//  - return the following JSON object: `{ error: "The user information could not be modified." }`.

//- If the user is found and the new information is valid:

//  - update the user document in the database using the new information sent in the `request body`.
//  - return HTTP status code `200` (OK).
//  - return the newly updated _user document_.






server.listen(8000, () => {
    console.log('\n***SERVER RUNNING ON PORT 8000***\n')
});