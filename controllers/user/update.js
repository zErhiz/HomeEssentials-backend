import User from "../../models/User.js";

const update = async (req, res, next) => {
    try {
        console.log(res);
        let response = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {new:true});
        if (response) {
        return res.status(200).json({
            success: true,
            message: "updated",
            response: response
        });
        } else {
        return res.status(404).json({
            success: false,
            message: "not found"
        });
        }
    } catch (error) {
        next(error);
    }
};
export default update;
