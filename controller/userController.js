import User from "../models/userModel.js"

export const updateUser = async(req,res)=>{
    const id = req.params.id

    try {
        const updateUser = await User.findByIdAndUpdate(id , {$set : req.body}, {new : true})

        res.json({
            success : true,
            message : "User Updated Successfully!!",
            data : updateUser
        })
    } catch (error) {
        res.json({
            success : false,
            message : "Error in  Updation!!"
        })
    }
}


export const deleteUser = async(req,res)=>{
    const id = req.params._id

    try {
        const deleteUser = await User.findByIdAndDelete(id)

        res.json({
            success : true,
            message : "User deleted Successfully!!",
        })
    } catch (error) {
        res.json({
            success : false,
            message : "Error in  Delete User!!"
        })
    }
}

// get Single User

export const getSingleUser = async(req,res)=>{
    const id = req.params._id
    try {
        const data = await User.find({id}).select("-password");
        res.json({
            success : true,
            message : "User found",
            data : data
        })
    } catch (error) {

        console.log(error);
        res.json({
            success : false,
            message : "User not found"
        })
    }
}


export const getAllUser = async(req,res)=>{
    try {
        const data = await User.find({}).select("-password")
        res.json({
            success : true,
            message : "User found",
            data : data
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "User not found"
        })
    }
}
