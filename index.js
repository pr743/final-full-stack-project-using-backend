import express from "express"
import connectDB from "./config/db.js";
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import dns from "dns";



dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/contact", contactRoutes);




app.get("/", (req, res) => {
    res.send(" Ai portfolio app backend running on sever");
});


const PORT = process.env.PORT || 7000;


app.listen(PORT, () => {
    console.log(`Server running at  http://localhost:${PORT}`);
})

