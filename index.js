import express from "express";
import cors from 'cors'
import { connection } from "./connection.js";
import usersRoute from './routes/Authorization.js'


const app = express();

app.use(cors())
app.use(express.json())

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
