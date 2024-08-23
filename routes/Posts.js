import express from 'express'
import { getPosts, getMyPost, addNewPost, deletePost, getMyPostByID, editPost } from '../controllers/Posts.js'

import multer from 'multer'
import path from 'path'

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage })


router.get("/", getPosts);
router.get("/myposts/:userID", getMyPost);
router.post('/addnewblog', upload.single('coverImage'), addNewPost);
router.delete("/deletepost/:postID", deletePost);
router.get("/mypost/:postID", getMyPostByID);
router.patch("/mypost/edit/:postID", editPost)

export default router;