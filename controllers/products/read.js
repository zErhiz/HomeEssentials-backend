import Products from "../../models/Product.js"
let read = async(req, res, next) => {
    let queries = {}
    let sort = {}
    console.log("req.query", req.query)
    if (req.query.manufacturerCheked) {
        queries.category_id = req.query.category_id.split(',')
    }
    if (req.query.categoriesCheked) {
        queries.manufacturer_id = req.query.manufacturer_id.split(',')
    }
    if (req.query.sort) {
        sort.price = req.query.price
    }
    try{
        let all = await Products.find(queries)
        return res.status(200)
        .json({
                products: all
            })                            
    }catch(error){}
            console.log(error)
            return res.status(400).json({error: "a ocurrido un problema"})
}
  export default read