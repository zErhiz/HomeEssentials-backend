import Cart from '../../models/cart.js';
import Product from '../../models/Product.js';

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'The cart doesn\'t exist' });
    }

    const itemIndex = cart.items.findIndex(item => item.product_id && item.product_id.equals(productId));

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'The product is not in the cart' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'The product doesn\'t exist' });
    }

    const productQuantity = product.quantity;
    const stockAvailable = product.stock_Available;

    if (cart.items[itemIndex].quantity > parseInt(quantity)) {
      cart.items[itemIndex].quantity -= parseInt(quantity);
    } else {
      cart.items.splice(itemIndex, 1);
    }

    product.stock_Available += parseInt(quantity); // Increment product stock by the specified quantity
    await product.save();

    await cart.save();

    if (cart.items.length === 0) {
      // Remove cart if there are no items left
      await cart.remove();
    }

    res.json({ message: 'The product has been removed from the cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error has occurred' });
  }
};

export default removeFromCart;