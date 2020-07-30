import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const secret = process.env.JWT_KEY;

		req.userData = jwt.verify(token, secret);
		next();
	} catch (e) {
		return res.status(401).json({
			message: 'Auth failed!',
		});
	}
};


// хешировать логін и оставлять його в кукі разом з незахешированим, потім звірять з тим що в базі(захеширував)