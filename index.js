import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connection } from "./connection.js";
import usersRoute from './routes/Authorization.js'


const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json())
app.use(cookieParser())

app.use("/user", usersRoute);



const PORT = 3000;
connection.connect((err) => {
    if(err) {
        console.log("error connecting to database: ", err)
        return
    } 
    app.listen(PORT, () => {
        console.log(`App is running port ${PORT}`);
    });
})
