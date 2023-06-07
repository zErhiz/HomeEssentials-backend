import Favorites from '../../models/Favorites.js'

let read = async (req, res, next) => {
    try {
        console.log(req.query.id);
        let id = req.query.id
        let read = await Favorites.find({
            user_id: id
        }).populate("product_id")
        return res.status(200).json({
            success: 'ok',
            response: read
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default read