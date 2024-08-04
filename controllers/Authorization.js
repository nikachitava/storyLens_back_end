import { connection } from "../connection.js";

export const registerUser = (req, res) => {
	const { username, surname, password, email } = req.body;

	const query = "SELECT * from users WHERE email = ?";

	connection.query(query, [email], (err, data) => {
		if (err) return res.status(500).json({ message: err.message });
		if (data.length)
			return res.status(409).json({ message: "Email already used" });


		const nickName = username + surname + Date.now().toString();

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
	const { email, password } = req.body;

	const query =
		"SELECT email, password from users WHERE email = ? AND password = ?";
	connection.query(query, [email, password], (err, data) => {
		if (err) return res.status(500).json({ message: err.message });
		if (!data.length)
			return res
				.status(200)
				.json({ message: "Email or password incorrect" });

		return res.status(200).json(data);
	});
};

export const getUsers = (req, res) => {
	const query = "SELECT * from users";
	connection.query(query, (err, data) => {
		if (err) return res.status(500).json({ message: err.message });
		return res.status(200).json(data);
	});
};
