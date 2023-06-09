import Cart from '../../models/cart.js';
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

export default addToCart;