const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentUuid: {
      type: String,
      unique: true,
  },
  name: {
     type: String
  },
  content: {
      type: String
  }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
