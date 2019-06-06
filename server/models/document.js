const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentUuid: {
      type: String,
      unique: true,
  },
  content: {
      type: String
  },
  ownerUuid : {
      type: String
  }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
