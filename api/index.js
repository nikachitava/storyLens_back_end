import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser';

import bodyParser from "body-parser";


import usersRoute from '../routes/Authorization.js'
import postsRoute from '../routes/Posts.js'
import likesRoute from '../routes/Likes.js'
import commentsRoute from '../routes/Comments.js'


const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(
    cors({
        origin: "https://story-lens-indol.vercel.app",
        credentials: true,
        
    })
);
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/user", usersRoute);
app.use("/posts", postsRoute);
app.use("/likes", likesRoute);
app.use("/comments", commentsRoute);


export default app
