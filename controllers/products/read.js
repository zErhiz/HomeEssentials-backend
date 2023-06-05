import Products from "../../models/Product.js"
let read = async(req, res, next) => { // la funcion controladora debe ser asincrona para poder esperar la respuesta de mongo 
    try                             //utilizo try cath para intentar algo y agarrar los errores q puedan surgir 
    {
let all = await Products.find()       //utilizo find para buscaR todos los recursos del modelo que es productos
return res.status(200)                   //configuro la respuesta que le tengo que enviar al cliente(front)
.json({
        products: all
    })                            
    }
    catch(error){}
 console.log(error)
 return res.status(400).json({error: "a ocurrido un problema"})
  }
  export default read