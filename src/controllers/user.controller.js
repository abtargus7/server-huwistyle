import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler ( async (req, res) => {
    const {username, fullName, email, password} = req.body;
    console.log(req.body)

    if(
        [fullName, email, username, password].some((field) => 
        field?.trim() === "") 
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = new User({
        fullName: fullName,
        password: password,
        email: email,
        username: username
    })

    const isCreated = await user.save()
    console.log(isCreated);

    const createdUser = await User.findById(isCreated._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

export { registerUser }