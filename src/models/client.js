import { Schema, model, models } from "mongoose";

const ClientSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
  },
  username: {
    type: String,
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
  fathername: {
    type: String,
  },
  phone: {
    type: String,
    unique: [true, "Уже есть пользователь с таким номером!"],
  },
  city: {
    type: String,
  },
  cityDescription: {
    type: String
  },
  address: {
    type: String,
  },
  addressDescription: {
    type: String
  },
  viber: {
    type: String,
  },
  card: {
    type: String
  },
  comment: {
    type: String
  },
  activated: {
    type: Boolean
  },
  shop: {
    type: Number
  },
  created: {
    type: String
  },
  discount: {
    type: Number
  },
  changed: {
    type: String
  },
});

const Client = models.Client || model("Client", ClientSchema);

export default Client;
