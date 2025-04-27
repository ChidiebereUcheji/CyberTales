const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const validator = require("validator");

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "You must provide a name"],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "You must provide a password!"],
      select: false,
    },
    profilePic: {
      public_id: { type: String, required: false },
      url: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

let Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
