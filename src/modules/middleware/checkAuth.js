import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const secret = process.env.JWT_KEY;

		req.userData = jwt.verify(token, secret);
		next();
	} catch (e) {
		// удали токен, бо не дійсний
		return res.status(200).json({
			message: 'Auth failed!',
		});
	}
};


// хешировать логін и оставлять його в кукі разом з незахешированим, потім звірять з тим що в базі(захеширував)