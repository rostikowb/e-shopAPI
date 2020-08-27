import jwt from 'jsonwebtoken';

export const checkAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(jwt.decode(token).admin){
            req.admin = true;
            next();
        } else {
            return res.status(200).json({invalid: true, msg:'Нет доступа!'})
        }

    } catch (e) {
        console.log(e);
    }

};