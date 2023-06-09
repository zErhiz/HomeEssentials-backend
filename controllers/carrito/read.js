import Cart from '../../models/cart.js';

// Controlador para ver el contenido del carrito de compras
const viewCart = async (req, res) => {
  try {
    const { userId } = req.params; 
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'The cart does not exist' });
    }

    const itemCount = cart.items.length; // Contador de artículos en el carrito

    res.json({ cart, itemCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

export default viewCart;