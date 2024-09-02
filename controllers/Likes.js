import { connection } from "../connection.js";

export const getLikes = (req,res)=>{
    const query = "SELECT userID FROM likes WHERE postID = ?";

    connection.query(query, [req.query.postID], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(like=>like.userID));
    });
}

export const addLike = (req, res) => {

    const query = "INSERT INTO likes (`userID`,`postID`) VALUES (?)";
    const values = [
      req.body.userID,
      req.body.postID
    ];

    connection.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
};

export const deleteLike = (req, res) => {

    const query = "DELETE FROM likes WHERE `userID` = ? AND `postID` = ?";

    connection.query(query, [req.query.userID, req.query.postID], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
};