const mongoose = require('mongoose');
const bcrypt = require('bcrpyt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    tyoe: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  }
});

userSchema.pre('save', async (next) => {
  try {
    if(!this.isModified('password')){
      return next();
    }
    let hashedPassword = bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch(err) {
    return next(err);
  }
});

userSchema.method.comparePassword = async (candidatePassword, next) => {
  try{
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(err){
    return next(err);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;