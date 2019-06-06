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

<<<<<<< HEAD
module.exports = Document;
=======
module.exports = {
  Document: Document
}
>>>>>>> 9f8aaeae7ab2211c181fd709fc946386e5ebc75c
