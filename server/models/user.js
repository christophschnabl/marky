import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userUuid: {
      type: String,
      unique: true,
  },
  name : {
    type: String
  },
  email: {
    type: String
  },
  imageUrl: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

export default User;
