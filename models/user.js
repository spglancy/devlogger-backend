const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [false, "The Email field is required"],
  },
  password: {
    type: String,
    required: [true, "The Password field is required"]
  },
  isCompany: {
    type: Boolean,
    required: [true, "The Account Type field is required"]
  },
  companyName: String,
  companyInfo: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

userSchema.pre("save", function (next) {
  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

// Need to use function to enable this.password to work.
userSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);
