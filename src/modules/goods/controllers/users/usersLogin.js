import User from "../../models/UserModel";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Bcrypt from '../../../class/bcrypt'

export const userLogin = (req, res) => {

    const validateEmail = (email) => {
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };
    let email = req.body?.email;
    let pass = req.body?.pass;

    if(!email||!pass) return res.status(200).json({invalid:true, message: 'Заполните пожалуйста все поля!'});

    if(!validateEmail(email)) return res.status(200).json({invalid:true, message: 'Невалидный email!'});

    User.findOne({email: email})
        .select('-_id')
        .exec()
        .then(async user => {
            console.log(user);
            if (!user) {
                return res.status(200).json({invalid:true, message: 'Пользователь с таким емейлом не найден!'});
            } else {
                let result = new Bcrypt(pass, user.password, user.email, user._id, bcrypt, jwt);
                result.hashValidation(res,user);
            }
        })
        .catch(err => res.status(200).json(err));
};