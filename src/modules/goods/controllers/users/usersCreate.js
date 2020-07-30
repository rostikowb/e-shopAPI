import mongoose from 'mongoose';
import User from '../../models/UserModel';
import bcrypt from 'bcryptjs';
import Bcrypt from "../../../class/bcrypt";
import jwt from "jsonwebtoken";

export const usersCreate = async (req, res) =>{
    const validateEmail = (email) => {
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email);
    };
    let errorValidMsg = '';
    let nick = req.body?.nick;
    let email = req.body?.email;
    let pass = req.body?.pass;

    console.log(req.body);
    // return res.status(200).json({invalid:true, message: 'Заполните пожалуйста все поля!'});
    if(!nick||!email||!pass) return res.status(200).json({invalid:true, message: 'Заполните пожалуйста все поля!'});


    if(!validateEmail(email)) errorValidMsg += ' * Невалидный email! ';

    if(pass.length < 8) errorValidMsg += ' * Пароль должен иметь больше 8 символов! ';

    if(errorValidMsg.length > 1) return res.status(200).json({invalid:true, message: errorValidMsg});

    User.find({email: email}).then(result => {
        if (result.length === 1) {
            return res.status(200).json({invalid:true, message: 'Вы уже зарегистрированы'});
        }
        bcrypt.hash(pass, 10, (err, hash) => {
            if (err) {
                return res.status(200).json({invalid:true, error: err});
            } else {
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    nick:nick,
                    email: email,
                    password: hash,
                });
                user
                    .save()
                    .then(user=>{
                        let result = new Bcrypt(pass, user.password, user.email, user._id, bcrypt, jwt);
                        result.hashValidation(res);
                    })
                    .catch(err => res.status(200).json({result: err}));
            }
        });
    });
};
