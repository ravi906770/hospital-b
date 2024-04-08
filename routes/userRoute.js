import express from "express"
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controller/userController.js"
import { restrict, verifyJwt } from "../middlewares/middleware.js"

const router = express.Router()

router.get("/:id",verifyJwt, restrict(["patient"]) ,getSingleUser )

router.get("/" ,verifyJwt, restrict(["admin"]), getAllUser)

router.put("/update/:id" ,verifyJwt, restrict(["patient"]) , updateUser)

router.delete("/delete/:id" ,verifyJwt, restrict(["patient"]) , deleteUser)



export default router