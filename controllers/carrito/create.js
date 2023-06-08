import Cart from '../../models/cart.js';
import Product from "../../models/Product.js"
// Controlador para agregar un producto al carrito de compras
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
        return res.status(404).json({ message: 'the product doesnt exist' });
      }
  
      const productQuantity = product.quantity;
      const stockAvailable = product.stock_Available;
  
      if (existingItem) {
        const newQuantity = existingItem.quantity + parseInt(quantity);
        if (stockAvailable <= 0) {
          return res.status(400).json({ message: 'there is no more stock' });
        }
        existingItem.quantity = newQuantity;
      } else {
        if (stockAvailable <= 0) {
          return res.status(400).json({ message: 'there is no more stock ' });
        }
        cart.items.push({ product_id: product._id, quantity: parseInt(quantity) });
      }
  
      // Restar la cantidad agregada al carrito al stock disponible del producto
      product.stock_Available -= parseInt(quantity);
      await product.save();
  
      await cart.save();
  
      res.json({ message: 'The product has been added to the cart' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'an error has ocurred' });
    }
  };
  
  export default addToCart;
  