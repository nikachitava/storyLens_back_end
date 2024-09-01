import { connection } from "../connection.js";

export const getPosts = (req, res) => {
    const query = "SELECT posts.*, users.nickname AS author FROM posts JOIN users ON posts.userID = users.userID";
    connection.query(query, (err, data) => {
        if(err) return res.status(500).json({message: err.message});
        return res.status(200).json(data);
    })
}

export const getMyPost = (req, res) => {
    const userID = req.params.userID;
    const query = "SELECT posts.*, users.nickname AS author FROM posts JOIN users ON posts.userID = users.userID WHERE users.userID = ?";
    connection.query(query, [userID], (err, data) => {
        if(err) return res.status(500).json({message: err.message});
        return res.status(200).json(data);
    })
}

export const getMyPostByID = (req, res) => {
    const postID = req.params.postID;
    const query = "SELECT posts.*, users.nickname AS author FROM posts JOIN users ON posts.userID = users.userID WHERE posts.postID = ?";
    connection.query(query, [postID], (err, data) => {
        if(err) return res.status(500).json({message: err.message});
        return res.status(200).json(data);
    })
}
 
export const addNewPost = (req, res) => {
    const { title, content, userID } = req.body;
    const coverImage = req.file ? `${req.file.filename}` : null;

    const query = "INSERT INTO posts (title, content, userID, coverImage) VALUES (?, ?, ?, ?)";
    connection.query(query, [title, content, userID, coverImage], (err, data) => {
        if(err) return res.status(500).json({message: err.message});
            
        return res.status(200).json({message: "Post created successfully"});
    })
}


export const deletePost = (req, res) => {
    const { postID } = req.params;
    const query = "DELETE from posts WHERE postID = ?";
    connection.query(query, [postID], (err, data) => {
        if(err) return res.status(500).json({message: err.message})
        return res.status(200).json({message: `Post id ${postID} deleted successfully`});
    })
}

export const editPost = (req, res) => {
    const {postID} = req.params;
    const {title, content} = req.body;
    const query = "UPDATE posts SET title = ?, content = ? WHERE postID = ?";
    connection.query(query, [title, content, postID], (err, data) => {
        if(err) return res.status(500).json({message: err.message})
            return res.status(200).json({message: `Post updated successfully`})
    })
}

export const getMainBlog = (req, res) => {
    const query = "SELECT * from mainblog INNER JOIN posts on mainblog.postID = posts.postID";
    connection.query(query, (err, data) => {
        if(err) return res.status(500).json({message: err.message});
        return res.status(200).json(data);
    })
}
