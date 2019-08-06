// implement your API here
const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());



// ROUTES------------------------------------------------------------


//| POST   | /api/users     | Creates a user using the information sent inside the `request body`.       

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
  
    if (!name || !bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user' });
    } 

    Users.insert(req.body)
      .then(users => {
            res.status(201).json(users);
        }
      ) 
      .catch(error => {
        res.status(500).json({ message: 'error: "There was an error while saving the user to the database' });
     }) ;
  });


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

//| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
  
    Users.remove(userId)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'The user with the specified ID does not exist' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'The user information could not be removed' });
      })  
  });


//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |


server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio }= req.body;

    // catch wire
    if (!name || !bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user' });
    } 
    // updating
    Users.update(id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'The user with the specified ID does not exist' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'The user information could not be modified' });
      })  
});


server.listen(8000, () => {
    console.log('\n***SERVER RUNNING ON PORT 8000***\n')
});