/* import Cart from '../../models/cart.js';
import Product from "../../models/Product.js"

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product_id && item.product_id.equals(productId));

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'The product doesnt exist' });
    }

    const stockAvailable = product.stock_Available;

    if (existingItem) {
      const newQuantity = existingItem.quantity + parseInt(quantity);
      if (stockAvailable < newQuantity) {
        return res.status(400).json({ message: 'There is no more stock' });
      }
      existingItem.quantity = newQuantity;
    } else {
      if (stockAvailable < parseInt(quantity)) {
        return res.status(400).json({ message: 'There is no more stock' });
      }
      cart.items.push({ product_id: product._id, quantity: parseInt(quantity) });
    }

    await cart.save();

    res.json({ message: 'The product has been added to the cart' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'An error has occurred' });
  }
};

export default addToCart; */

import Cart from '../../models/cart.js';
import User from '../../models/User.js';
import Product from '../../models/Product.js';

const addAndUpdateToCart = async (req, res) => {
  try {
    const { userEmail, productId } = req.body;

    let user = await User.findOne({ email: userEmail});
    let product = await Product.findOne({ _id: productId});

    if(user && product){
      let cart = await Cart.findOne({ user: user._id, product_id: productId});
      if (!cart) {
        const data = { 
                        user : user._id,
                        product_id: productId,
                        quantity: 1
                      }
        let one = await Cart.create(data)
        if(one){  
            return res.status(201).json({
              id: one._id,
              message: ["Product added to cart successfully"],
              timestamps: one.createdAt
            })
          }else{
            return res.status(404).json({
              success: false,
              message: ["Not found"],
            })
          }
      }else{
        if(product.stock_Available > cart.quantity){
          const data = {
            quantity: cart.quantity + 1
          }
          console.log("cart", cart);
          let update = await Cart.findByIdAndUpdate(
                                    cart._id,
                                    data,
                                    {new: true}
                                  ).populate("product_id")
            if (update){
                return res.status(200).json({
                    success: true,
                    message: ["Product updated successfully"],
                    update: update
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: ["Not found"],
                })
            }
          }else{
            return res.status(404).json({
              success: false,
              message: ["There are no more stocks"],
            })
          }
        }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'User or product does not exist'});
  }
};

export default addAndUpdateToCart;