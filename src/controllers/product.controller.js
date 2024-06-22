import {asyncHandler} from "../utils/asyncHandler.js"

const addProducts = asyncHandler( async( req, res)=> {
    try{
        return res.status(200).json({
            message: "Added Product"
        })
    } catch (error) {
        return res.json({
            error: error
        })
    }
})

export {addProducts};