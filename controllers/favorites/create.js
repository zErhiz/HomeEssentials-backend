import Favorites from '../../models/Favorites.js'

let create = async(req, res, next) => {
    try{
        let one = await Favorites.create(req.body)
        return res.status(201).json({
            Favorites: one,
            success: true
        })
    } catch(error){
        next(error)
    }
}

export default create