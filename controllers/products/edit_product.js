import Product from "../../models/Product.js";

let update =async(req,res,next)=>{
    try {
        
        let product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        ).populate('category_id').populate('manufacturer_id')
        return res.status(200).json({
            succes:true,
            product
        })
        
        
    } catch (error) {
       console.log(error)
        
    }
}
export default update