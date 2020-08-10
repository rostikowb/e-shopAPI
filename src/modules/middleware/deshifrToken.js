import jwt from 'jsonwebtoken';

export const decodeToken = (req, res, next) => {
    // console.log('req.headers',req.headers);
    try {
        const token = req.headers.authorization;
        req.userId = jwt.decode(token).userId;
    } catch (e) {
        req.userId = null
    }
    next();
};