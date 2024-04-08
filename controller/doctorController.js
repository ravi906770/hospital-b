import Doctor from "../models/doctorSchema.js"

export const updateDcotor = async(req,res)=>{
    const id = req.params._id

    try {
        const updateDoctor = await Doctor.findByIdAndUpdate(id , {$set : req.body}, {new : true})

        res.json({
            success : true,
            message : "User Updated Successfully!!",
            data : updateDoctor
        })
    } catch (error) {
        res.json({
            success : false,
            message : "Error in  Updation!!"
        })
    }
}


export const deleteDoctor = async(req,res)=>{
    const id = req.params._id

    try {
        const deleteDoctor = Doctor.findByIdAndDelete(id)

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


export const getAllDoctor = async(req,res)=>{
    try {
        
        const {query} = req.query;
        let doctors

        if(query){
            doctors = await Doctor.find({isApproved : "approved" , $or:[{name : {$regex : query , $options : "i"}},
            {specialization : {$regex : query , $options : "i"}}
        ]}).select("-password")
        }else{
            doctors = await Doctor.find({}).select("-password")
        }
        res.json({
            success : true,
            message : "Doctor found",
            data : doctors
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Dcotor not found"
        })
    }
}



export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id
    try {
        const data = await Doctor.findById(id).populate("reviews").select("-password")
        res.json({
            success : true,
            message : "Doctor found",
            data : data
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Doctor not found"
        })
    }
}