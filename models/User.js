import { Schema, model } from "mongoose";

let schema = new Schema(
  {
    name: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, required: true },
    role: { type: Number, required: true },
    is_online: { type: Boolean, required: true },
    is_verified: { type: Boolean, required: false },
    verify_code: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

let collection = "users";

let User = model(collection, schema);

export default User;