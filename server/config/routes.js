var mongoose = require('mongoose');
var Pet = mongoose.model('Pet');
var pets  = require('../controllers/pets');

module.exports = function(app) {
  // Get to retrieve all pets
  app.get('/pts', function(req, res) {
    pets.showAll(req, res);
  });

  // Post to create 
  app.post('/pts', function (req, res) {
    console.log('from routes.js app.post')
    pets.createOne(req, res);
  });

  // Put to update 
  app.put('/pts/:id', function (req, res) {
    // console.log('from routes.js app.put, req is ', req)
    // console.log('from routes.js app.put, res is ', res)
    pets.updateOne(req, res);
  });

  // Delete to delete 
  app.delete('/pts/:id', function(req, res) {
    console.log('this is from routes.js', req.params.id);
    pets.deleteOne(req, res);
  });

  // Get to retrieve by ID
  app.get('/pts/:id', function(req, res) {
    pets.findOne(req, res);
  });
};
