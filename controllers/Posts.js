import { connection } from "../connection.js";

export const getPosts = (req, res) => {
    const query = "SELECT posts.*, users.nickname AS author FROM posts JOIN users ON posts.userID = users.userID";
    connection.query(query, (err, data) => {
        if(err) return res.status(500).json({message: err.message});
        return res.status(200).json(data);
    })
}