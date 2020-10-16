import bcrypt from "bcryptjs";
import Bcrypt from "../../../class/bcrypt";
import jwt from "jsonwebtoken";
import {checkPin} from "./func/checkPin";

export const userRestore2 = async (req, res) => {
    const newPass = req.body?.pass;
    let user = await checkPin(req)

    if(user.invalid) return res.status(200).json(user)
    user = user.user;

    if (!newPass || newPass.length < 8) return res.status(200).json({invalid: true, msg:' * Пароль должен иметь больше 8 символов! '}) ;

    // console.log(newPass);
    bcrypt.hash(newPass, 10, (err, hash) => {
        if (err) {
            return res.status(200).json({invalid: true, error: err});
        } else {
            console.log(user);
            user.pass = hash;
            user
                .save()
                .then(user => {
                    console.log(user);
                    let result = new Bcrypt(newPass, user.pass, user.email, user._id, bcrypt, jwt);
                    result.hashValidation(res, user).then(e => {
                        return res.status(200).json(e);
                    });

                })
                .catch(err => res.status(200).json({result: err}));
        }
    });

    // return res.status(200).json({user})
};