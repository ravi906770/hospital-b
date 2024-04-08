import Review from "../models/reviewSchema.js"
import Doctor from "../models/doctorSchema.js"
import { response } from "express"

export const getAllReview = async(req,res)=>{
    try {
        const reviews = await Review.find({})
        res.json({
            success : true,
            message : "All Reviews",
            data : reviews
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "error in get Reviews"
        })
    }
}


export const createReview = async(req,res)=>{
    // console.log("asertthrsgdv");
    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    if(!req.body.user) req.body.user = req.userId

    // const {reviewText , rating}  = req.body

    const newReview = new Review(req.body)
    try {
        const savedReview = await newReview.save()
        await Doctor.findByIdAndUpdate(req.body.doctor , {
            $push : {reviews : savedReview._id}
        })

        res.json({
            success : true,
            message : "Review Created Successfully!!",
            data : savedReview
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "error in Review Creation!!",
        })
    }
}