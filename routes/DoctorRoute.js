import express from "express"
import { deleteDoctor, getAllDoctor, getSingleDoctor, updateDcotor } from "../controller/doctorController.js"
import { verifyJwt, restrict } from "../middlewares/middleware.js"
import reviewRoute from "./reviewRoute.js"

const router = express.Router()

router.use("/:doctorId/review", reviewRoute)

router.get("/:id",getSingleDoctor )

router.get("/" , getAllDoctor)

router.put("/update/:id" ,verifyJwt, restrict(["doctor"]) , updateDcotor)

router.delete("/delete/:id" ,verifyJwt, restrict(["doctor"]) , deleteDoctor)



export default router