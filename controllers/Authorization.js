import { connection } from '../connection.js'


export const loginUser =  (req, res) => {

    const {email, password} = req.body;

    const query = "SELECT email, password from users WHERE email = ? AND password = ?";
    connection.query(query, [email, password], (err, data) => {
        if(err) return res.status(500).json({message: err.message});
        if(!data.length) return res.status(200).json({message: "Email or password incorrect"});

        return res.status(200).json(data)
        
        
    })
}


export const getUsers =  (req, res) => {
    const query = "SELECT * from users";
    connection.query(query, (err, data) => {
        if(err) return res.status(500).json({message: err.message})
        return res.status(200).json(data)
    })
}