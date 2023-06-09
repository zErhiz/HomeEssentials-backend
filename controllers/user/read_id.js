import User from '../../models/User.js'

let get_id = async(req,res,next) => {
    try {
        console.log("res", res)
        let id = await User.findOne({
            email: req.params.email}, "_id")
            if(id){
                return res.status(200).json({
                    success: true,
                    response: id
                })
            }
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })  
        
    }
    catch (error) {
        next(error)
    }
}

export default get_id
