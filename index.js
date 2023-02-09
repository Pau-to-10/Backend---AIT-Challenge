import "dotenv/config";
import "./src/config/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
// import cors from "cors";

import authRouter from "./src/routes/auth.route.js";

const app = express();

// const whiteList = [process.env.ORIGIN1];

// app.use(
//     cors({
//         origin: function (origin, callback) {
//             console.log("😲😲😲 =>", origin);
//             if (!origin || whiteList.includes(origin)) {
//                 return callback(null, origin);
//             }
//             return callback(
//                 "Error de CORS origin: " + origin + " No autorizado!"
//             );
//         },
//         credentials: true,
//     })
// );

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🍉🍉🍉 http://localhost:" + PORT));
