import User from "../models/userModel.js"
import Doctor from "../models/doctorSchema.js"
import { hashPassword } from "../helper/password.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const generateToken = (user)=>{
    return jwt.sign({_id : user._id , role : user.role}, "12345" ,{expiresIn : "30d"} )
}

export const registerController = async (req,res)=>{

    const {email , password , name , role , photo , gender} = req.body;

    try {
        let user = null
        if(role === "patient"){
            user = await User.findOne({email})
        }else if (role === "doctor"){
            user = await User.findOne({email})
        }

        if(user){
            res.json({
                success : false,
                message : "User is already Registerd!!"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        if(role === "patient"){
            user = new User({
                name,
            email,
            role,
            gender,
            password : hashPassword,
            photo
            })
        }


        if(role === "doctor"){
            user = new Doctor({
                name,
            email,
            role,
            gender,
            password : hashPassword,
            photo
            })
        }

        await user.save()
        

        res.json({
            success : true,
            message : "Successfully Registered!!",
            data : user
        })
       
    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            message : "Something went wrong while register!!"
        })
    }
}


export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;
        
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        }

        if (doctor) {
            user = doctor;
        }

        if (!user) {
            res.json({
                success: false,
                message: "User not found!!"
            });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            res.json({
                success: false,
                message: "Password does not match!!"
            });
            return;
        }

        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc;

        res.json({
            success: true,
            message: "Login Successful!!",
            token,
            data: { ...rest },
            role
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Login Failed!!"
        });
    }
};
