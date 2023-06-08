import { Schema, model, Types} from "mongoose";

let cartItemSchema  = new Schema(
  {
  product_id: {type: Types.ObjectId, ref: 'products'},
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema({
  user: {type: Types.ObjectId, ref: 'users',},
  items: [cartItemSchema],
}, {
  timestamps: true,
});
let collection = "carts";
let Cart = model(collection, cartSchema);

export default Cart;