import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
    try {
        const token = req.headers?.authorization;
        const decode = jwt.decode(token);
        // console.log(decode);
        if (decode?.rights > 0) {
            if (decode?.rights === 1) {
                delete req.body?.rights
            }

            req.rights = decode?.rights
            next();
        } else {
            return res.status(200).json({invalid: true, msg: 'Недостаточный уровень доступа!'})
        }

    } catch (e) {
        console.log(e);
    }
};