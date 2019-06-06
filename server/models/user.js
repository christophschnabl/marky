const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id_token: {
    type: String
  },
  name : {
    type: String
  },
  email: {
    type: String
  },
  imageUrl: {
    type: String
  },
  documents: {
    type: [String] //documentUUids
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
