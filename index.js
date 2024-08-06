import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser';

import multer from 'multer'
import path from 'path'
import bodyParser from "body-parser";

import { connection } from "./connection.js";

import usersRoute from './routes/Authorization.js'
import postsRoute from './routes/Posts.js'


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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/user", usersRoute);
app.use("/posts", postsRoute);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage }).single('coverImage');



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
