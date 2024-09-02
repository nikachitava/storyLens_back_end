import moment from "moment";
import { connection } from "../connection.js";

export const getComments = (req, res) => {
    const query = `SELECT c.*, u.userID, u.nickname AS name FROM comments AS c JOIN users AS u ON u.userID = c.userID WHERE c.postID = ? ORDER BY c.created_at DESC`;

  connection.query(query, [req.query.postID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
    const query = "INSERT INTO comments(`postID`, `userID`, `desc`, `created_at`) VALUES (?)";

    const values = [
        req.body.postID,
        req.body.userID,
        req.body.comment,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    connection.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
};

export const deleteComment = (req, res) => {

    const commentId = req.params.id;
    const query = "DELETE FROM comments WHERE `id` = ? AND `userID` = ?";

    connection.query(query, [commentId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    });
};