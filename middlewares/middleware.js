import jwt from "jsonwebtoken"
import Doctor from "../models/doctorSchema.js"
import User from "../models/userModel.js"

export const verifyJwt = async(req,res ,next)=>{

    const token = req.headers.authorization
    if(!token || !token.startsWith("Bearer ")){
        res.json({
            success : false,
            message : "You are not authorized!!"
        })
        return
    }

    try {
        const access_token = token.split(" ")[1]
        const decoded = jwt.verify(access_token , "12345")

        req.userId = decoded._id
        req.role = decoded.role

        next();

    } catch (error) {
        res.json({
            success : false,
            message : "Error in Token Validation!!"
        })
    }
}


export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;
    let user;

    try {
        const patient = await User.findById(userId);
        const doctor = await Doctor.findById(userId);

        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }

        if (!roles.includes(user?.role)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized!"
            });
        }

        next(); // Call next middleware in the stack
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in authorization middleware"
        });
    }
};
