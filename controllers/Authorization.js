import { connection } from "../connection.js";
import jwt from 'jsonwebtoken'

export const registerUser = (req, res) => {
	const { username, surname, password, email } = req.body;

	const query = "SELECT * from users WHERE email = ?";

	connection.query(query, [email], (err, data) => {
		if (err) return res.status(500).json({ message: err.message });
		if (data.length)
			return res.status(409).json({ message: "Email already used" });


		const date = new Date()
		const nickName = username + surname + date.getMilliseconds();

		const insertQuery =
			"INSERT INTO users (`nickname`, `username`, `surname`, `password`, `email`) VALUES (?, ?, ?, ?, ?)";
		connection.query(
			insertQuery,
			[nickName, username, surname, password, email],
			(err, data) => {
				if (err) return res.status(500).json({ message: err.message });
				return res
					.status(200)
					.json({ message: "User has been created successfully" });
			}
		);
	});
};

export const loginUser = (req, res) => {

	const query =
		"SELECT * from users WHERE email = ?";
	connection.query(query, [req.body.email], (err, data) => {
		if (err) return res.status(500).json({ message: err.message });
		if (!data.length)
			return res
				.status(400)
				.json({ message: "Email or password incorrect" });

		if(req.body.password !== data[0].password) {
            return res.status(400).json({message: "Wrong password"})
        }

        const token = jwt.sign({id: data[0].id}, "secretkey")

        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
	});
};

export const getUsers = (req, res) => {
	const query = "SELECT * from users";
	connection.query(query, (err, data) => {
		if (err) return res.status(500).json({ message: err.message });
		return res.status(200).json(data);
	});
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has beed logged out")
}
