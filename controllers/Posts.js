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
 
export const addNewPost = (req, res) => {
    const { title, content, userID } = req.body;
    const coverImage = req.file ? `${req.file.filename}` : null;

    const query = "INSERT INTO posts (title, content, userID, coverImage) VALUES (?, ?, ?, ?)";
    connection.query(query, [title, content, userID, coverImage], (err, data) => {
        if(err) {
            console.error("Database error: ", err);
            return res.status(500).json({message: err.message})
            
        } 
            return res.status(200).json({message: "Blog created successfully"})
    })
}