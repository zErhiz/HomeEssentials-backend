import Cart from '../../models/cart.js';
import Product from '../../models/Product.js';
import User from '../../models/User.js';

const confirmPurchase = async (req, res) => {
  try {
    const { userEmail } = req.query;
    let user = await User.findOne({ email: userEmail});
    const cart = await Cart.find({ user: user._id });

    if (!cart) {
      return res.status(404).json({ message: 'The cart doesn\'t exist' });
    }

    // recorremos los items de lcarrito
    for (const item of cart) {
      const product = await Product.findOne({_id: item.product_id});
      if(product){
        console.log("product" , product);
        const update = await Product.findByIdAndUpdate(
                                          product._id,
                                          {stock_Available: product.stock_Available - 1},
                                          {new: true},)
        if (update){console.log(`${product.name} updated`)}
        await Cart.findOneAndDelete({user: user._id})
      }
    }
    return res.status(200).json({
        success: true,
        message: ["Congratulations, successful purchase"]
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error has occurred' });
  }
};

export default confirmPurchase;