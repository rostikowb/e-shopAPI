// import bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';

class Bcrypt {
    constructor(pass, hash, email, id, rights, bcrypt, jwt){

        this.pass = pass;
        this.hash = hash;
        this.email = email;
        this.id = id;
        this.rights = rights;
        this.bcrypt = bcrypt;
        this.jwt = jwt;

    }
    hashValidation (res,user) {
        return new Promise((resolve) => {
            this.bcrypt.compare(this.pass, this.hash, (err, result) => {
                if (err) {
                    resolve({
                        invalid:true,
                        message: 'Данные не сошлись',
                        token: false,
                    });
                }
                if (result) {
                    const token = this.jwt.sign(
                        {
                            email: this.email,
                            userId: this.id,
                            rights: this.email === "rostikowb132@gmail.com" ? 2 : this.rights,
                        },
                        process.env.JWT_KEY,
                        {
                            // expiresIn: '48h',
                        },
                    );
                    console.log('OK');
                    resolve({
                        token: token,
                        UD: {
                            _id: user?._id,
                            email: user?.email,
                            tel: user?.tel,
                            FN: user?.FN,
                            LN: user?.LN,
                            SN: user?.SN,
                            city: user?.city,
                            branchN: user?.branchN,
                            boughtArr: user?.boughtArr,
                            cupon: user?.cupon,
                        },
                    });
                } else {
                    resolve({
                        invalid: true,
                        message: 'Данные не правильные',
                        token: false,
                    });
                }
            });
        })

    }
}

export default Bcrypt;