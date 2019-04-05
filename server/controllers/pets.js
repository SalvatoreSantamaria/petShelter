var mongoose = require('mongoose');
var Pet = mongoose.model('Pet');

module.exports = {
  showAll: function(req, res) {
    Pet.find({}, function(err, pets) {
      if (err) {
        console.log('There is an error', err);
        // respond with JSON
        res.status(500).json({ message: 'There is an error', error: err }); //500 is an error code
      } else {
        // respond with JSON
        console.log('incoming pet data');
        res.json(pets);
      }
    });
  },

  //working, original code
  // createOne: function (req, res) {
  //   console.log('createOne from pets.js')
  //   var pet = new Pet({
  //     name: req.body.name,
  //     description: req.body.description,
  //     type: req.body.type,
  //     skill1: req.body.skill1,
  //     skill2: req.body.skill2,
  //     skill3: req.body.skill3,
  //   });
  //   pet.save(function(err, results) {
  //     if (err) {
  //       console.log('There is an error', err);
  //     } else {
  //       console.log('Pet Added!', results);
  //      // res.redirect('/pets'); // original code, but i think this breaks it, 3/9
  //       res.json(results) // is this correct? yes! returns results :D
  //     }
  //   });
  // },


//new code with validation, in progress
  createOne: function (req, res) {
    console.log('createOne from pets.js')
    var pet = new Pet({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      skill1: req.body.skill1,
      skill2: req.body.skill2,
      skill3: req.body.skill3,
    });
    pet.save()
      .then(function(results) {
        console.log('Pet Added!', results);
        res.json(results);
      })
      .catch(error => {
        const errors = Object.keys(error.errors)
        .map(key => error.errors[key].message)
        console.log("From controllers/pet.js. There are server errors ", errors)
        res.json({error: errors})
    });
  },


  updateOne: function(req, res) {
    console.log(req.params.id);
    Pet.update(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3,
      },
      function(error, data) {
        if (error) {
          console.log(error);
          res.json({
            message: 'There is an error',
            error: error,
          });
        } else {
          console.log('Data Updated! This is data', data);
          res.json({
            message: 'Success',
            data: data
          });
        }
      }
    );
  },
  deleteOne: function(req, res) {
    Pet.remove({ _id: req.params.id }, function(err, deletedPet) {
      if (err) {
        console.log('There is an error', err);
      } else {
        console.log('Pet deleted');
        res.json(deletedPet); //reponding with API
      }
    });
  },
  findOne: function(req, res) {
    Pet.findOne({ _id: req.params.id }, function(err, pet) {
      if (err) {
        console.log('There is an error', err);
      } else {
        console.log('Pet found');
        // respond with JSON
        res.json({ data: pet });
      }
    });
  },
};
