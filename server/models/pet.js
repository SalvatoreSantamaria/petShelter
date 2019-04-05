var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PetSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], minlength: [3, 'Pet name text length must be at least 3 charcters long'] },
  description: { type: String, required: [true, 'Description is required'], minlength: [3, 'Pet description text length must be at least 3 charcters long'] },
  type: { type: String, required: [true, 'Type is required'], minlength: [3, 'Pet type text length must be at least 3 charcters long'] },
  likes: { type: Number, default: 0 },
  skill1: { type: String, default: '' },
  skill2: { type: String, default: '' },
  skill3: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet');

module.exports = Pet;
