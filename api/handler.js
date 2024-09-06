import { connection } from "../connection.js"; 

export default (req, res) => {
    if (!connection._connectCalled) {
        connection.connect((err) => {
            if (err) {
                console.error("Error connecting to database:", err);
                res.status(500).send("Error connecting to database");
                return;
            }
        });
    }
    
    app(req, res);
};