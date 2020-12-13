import mongoose from 'mongoose';
import User from '../../models/UserModel';
import bcrypt from 'bcryptjs';
import Bcrypt from "../../../class/bcrypt";
import jwt from "jsonwebtoken";
import {userDataValidator} from "./func/userDataValidater";

export const usersCreate = async (req, res) => {

    let FN = req.body?.FN;
    let email = req.body?.email;
    let pass = req.body?.pass;

    let valid = userDataValidator(true, FN, email, pass);
    if(valid) res.status(200).json(valid);

    User.find({email: email}).then(result => {
        if (result.length === 1) {
            return res.status(200).json({invalid: true, message: 'Вы уже зарегистрированы'});
        }
        bcrypt.hash(pass, 10, (err, hash) => {
            if (err) {
                return res.status(200).json({invalid: true, error: err});
            } else {
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    FN,
                    email,
                    pass: hash,
                    date: Date.now(),
                });
                user
                    .save()
                    .then(user => {
                        let result = new Bcrypt(pass, user.pass, user.email, user._id, user.rights, bcrypt, jwt);
                        result.hashValidation(res, user).then(e => {
                            return res.status(200).json(e);
                        });

                    })
                    .catch(err => res.status(200).json({result: err}));
            }
        });
    });
};
