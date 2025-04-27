const mongoose = require("mongoose");


const validator = require("validator");

const Schema = mongoose.Schema;

function randomXToY(minVal, maxVal) {
  var randVal = minVal + Math.random() * (maxVal - minVal);
  return Math.round(randVal);
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email Field is required"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email address",
      },
    },
    has_activated: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: function () {
        return randomXToY(1000, 9999);
      },
    },
    
    username: {
      type: String,
      required: [true, "Email Field is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password Field is required"],

    },
    department: {
      type: String,
      // required: [true, "Password Field is required"],

    },
    about:{
      type:String
    },
    experience: {
      type: String,
    },
    leaderBoard: {
      type: String,
    },
    token:{
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    attemptedQuestions: {
      type: Number,
      default: 0
    },
    pointsScored: {
      type: Number,
      default: 0
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

let User = mongoose.model("User", UserSchema);

module.exports = User;