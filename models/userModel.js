const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,
    minlength: [4, "Name must be at least 4 characters"],
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    default: "default.png",
  },
  password: {
    type: String,
    select: false,
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password not matched!",
    },
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  passwordChangeAt: Date,
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ isActive: { $ne: false } });
  next();
});

userSchema.methods.isPasswordMatched = async function (candidatePass) {
  return await bcrypt.compare(candidatePass, this.password);
};

userSchema.methods.isPasswordChanged = function (jwtTimeStamp) {
  if (this.passwordChangeAt) {
    const passwordChangedAt = parseInt(this.passwordChangeAt / 1000, 10);
    return passwordChangedAt > jwtTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
});
const User = mongoose.model("User", userSchema);
module.exports = User;
