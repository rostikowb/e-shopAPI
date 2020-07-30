// import bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';

class Bcrypt {
    constructor(password, hash, login, id, bcrypt, jwt){

        this.password = password;
        this.hash = hash;
        this.login = login;
        this.id = id;
        this.bcrypt = bcrypt;
        this.jwt = jwt;

    }
    hashValidation(res,user){
        return this.bcrypt.compare(this.password, this.hash, (err, result) => {
            if (err) {
                res.status(200).json({
                    invalid:true,
                    message: 'Данные не сошлись',
                    token: false,
                });
            }
            if (result) {
                const token = this.jwt.sign(
                    {
                        login: this.login,
                        userId: this.id,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '24h',
                    },
                );
                res.status(200).json({
                    token: token,
                    userData:{nick:user.nick, email:user.email}
                });
            } else {
                res.status(200).json({
                    invalid:true,
                    message: 'Данные не правильные',
                    token: false,
                });
            }
        });
    }
}

export default Bcrypt;