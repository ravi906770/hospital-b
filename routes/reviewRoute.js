import express from "express"
import { createReview, getAllReview } from "../controller/reviewController.js"
import { restrict, verifyJwt } from "../middlewares/middleware.js"

const router = express.Router({mergeParams: true})

// router.route("/").get(getAllReview).post(verifyJwt, restrict(["patient"]),createReview)
router.get("/" , getAllReview)
router.post("/", verifyJwt, restrict(["patient"]), createReview);




export default router