import User from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Bcrypt from '../../../class/bcrypt'

export const userLogin = (req, res) => {

    let email = req?.body?.email;
    let pass = req?.body?.pass;

    const validateEmail = (email) => {
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };

    if (!email || !pass) return res.status(200).json({invalid: true, message: 'Заполните пожалуйста все поля!'});

    if (!validateEmail(email)) return res.status(200).json({invalid: true, message: 'Невалидный email!'});

    User.findOne({email: email})
        .populate({path: 'boughtArr', select: '-UD'})
        .exec()
        .then(user => {
            if (!user) {
                return res.status(200).json({invalid: true, message: 'Пользователь с таким емейлом не найден!'});
            } else {
                // console.log(user.boughtArr[0].goods);
                let result = new Bcrypt(pass, user.pass, user.email, user._id, bcrypt, jwt);
                result.hashValidation(res, user).then(e => {
                    return res.status(200).json(e);
                });
            }
        })
        .catch(err => res.status(200).json(err));
};