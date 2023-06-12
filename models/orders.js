import { Schema, model, Types } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      name: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
    },
    product: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      price_offer: { type: Number, required: false },
      percentage_offer: { type: Number, required: true },
      quantity: {type: Number, required: true},
      category_id: { type: Types.ObjectId, ref: "categories", required: true },
      manufacturer_id: {
        type: Types.ObjectId,
        ref: "manufacturers",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;