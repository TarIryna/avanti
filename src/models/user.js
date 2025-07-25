import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  adress: {
    type: String,
  },
  isViber: {
    type: Boolean,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
