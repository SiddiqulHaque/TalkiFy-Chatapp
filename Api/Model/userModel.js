const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    profilePic: {
      type: String,
      default:""
    },
  },
  {
    timestamps: true,
  }
);
module.exports=mongoose.model("User",userSchema);