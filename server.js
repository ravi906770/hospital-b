import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connection from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import doctorRoute from "./routes/DoctorRoute.js"
import reviewRoute from "./routes/reviewRoute.js"

dotenv.config();

// Database Connection
connection();
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost/3000",
    methods : "GET,POST,PUT,DELETE"
}));


app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/doctor",doctorRoute)
app.use("/api/v1/review",reviewRoute)

const PORT = process.env.PORT || 8000;
// Run our app on Local Port Number 8000
app.listen(PORT , ()=>{
    console.log(`Connection is created on ${PORT}`)
})
