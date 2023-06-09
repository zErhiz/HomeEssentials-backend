import Cart from '../../models/cart.js';
import Product from '../../models/Product.js';

const confirmPurchase = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'The cart doesn\'t exist' });
    }

    const items = cart.items;

    // recorremos los items de lcarrito
    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(404).json({ message: 'The product doesnt exist' });
      }

      // Ccheckeamos siu ahi productos
      if (product.stock_Available < item.quantity) {
        return res.status(400).json({ message: 'There is not enough stock for the product' });
      }

      // Subtract the quantity from the product stock
      product.stock_Available -= item.quantity;
      await product.save();
    }

    // Clear the cart after confirming the purchase
    cart.items = [];
    await cart.save();

    res.json({ message: 'Purchase confirmed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error has occurred' });
  }
};

export default confirmPurchase;