import User from "../../models/UserModel";
import mongoose from "mongoose";
import Bcrypt from "../../../class/bcrypt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {userDataValidator} from "../users/func/userDataValidater";
import BoughtModel from "../../models/BoughtModel";

export const boughtCreate = async (req, res) => {

    let userId = req?.userId;
    let nick = req.body?.UD?.nick;
    let email = req.body?.UD?.email;
    let pass = req.body?.UD?.pass;
    let FN = req.body?.UD?.FN;
    let LN = req.body?.UD?.LN;
    let SN = req.body?.UD?.SN;
    let tel = req.body?.UD?.tel;
    let city = req.body?.UD?.optCity;
    let branchN = req.body?.UD?.optBranchN;
    let goods = req.body?.goods;
    let cupon = req.body?.UD?.cupon;
    let msg = req.body?.UD?.msg
    let userCupon;

    let auth;
    let token;
    let UD;
    let userFind;

    if (pass) {
        let valid = userDataValidator(false, nick, email, pass, FN, LN, SN, tel, city, branchN);

        if (valid) return res.status(200).json(valid);

        userFind = await User.find({email: email});

        if (userFind.length !== 1) {

            auth = await new Promise((resolve) => {
                bcrypt.hash(pass, 10, async (err, hash) => {
                    if (err) {
                        resolve({invalid: true, error: err});
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            nick,
                            email,
                            pass: hash,
                            FN,
                            LN,
                            SN,
                            tel,
                            city,
                            branchN,
                            date: Date.now(),
                        });

                        let userRes = await user.save();
                        let result = new Bcrypt(pass, user.pass, user.email, user._id, user.rights, bcrypt, jwt);

                        try {
                            auth = await result.hashValidation(res, userRes);

                            token = auth.token;
                            UD = auth.UD;
                            delete Object.assign(UD, {['userId']: UD['_id']})['userId'];
                            resolve({token, UD})
                        } catch (e) {
                            console.log('e', e);
                            resolve({invalid: true, result: e})
                        }
                    }
                });
            })
        }
        if (auth?.invalid) {
            return res.status(200).json(auth);
        }
    }

    const goodsArr = goods.map(item => {
        if (mongoose.Types.ObjectId.isValid(item._id))
            return res.status(200).json({invalid: true, result: "Этих товаров в базе данных нет"});

        return {
            goodsId: item.goodsId,
            count: item.count,
            price: item.price,
            date: Date.now(),
        };
    });


    if (!userId) userId = auth?.UD?._id;
    token = auth?.token;
    UD = auth?.UD;

    const bought = new BoughtModel({
        _id: mongoose.Types.ObjectId(),
        goods: goodsArr,
        UD: {
            userId,
            email,
            FN,
            LN,
            SN,
            tel,
            city,
            branchN,
        },
        date: Date.now(),
        stage: 0,
        pay: 0,
        cupon: cupon || 0,
        msg,
    });

    try {

    } catch (e) {
        return res.status(200).json({invalid: true, result: e})
    }
    // let upUser;
    try {

        if (userId) {
            UD = await User.findById(userId);
            // console.log('cupon',cupon);
            if (cupon && Number.isInteger(cupon)) {
                // console.log('cupooooooon');
                const index = UD.cupon.indexOf(cupon);
                if (index > -1) {
                    UD.cupon = UD.cupon.splice(index, 1);

                } else {
                    return res.status(200).json({
                        invalid: true,
                        result: "Что-то не так с вашим купоном, свяжитесь с нами что бы решить проблему"
                    });
                }
            }

            UD.boughtArr = [...UD.boughtArr, bought._id];
            if(!UD.FN) UD.FN = FN;
            if(!UD.LN) UD.LN = LN;
            if(!UD.SN) UD.SN = SN;
            if(!UD.tel) UD.tel = tel;
            if(!UD.city) UD.city = city;
            if(!UD.branchN) UD.branchN = branchN;

            UD = await Promise.all([
                UD.save(),
                UD.populate({path: 'boughtArr', select: '-UD'}).execPopulate(),
                bought.save(),
            ]);

            // console.log(UD);
        }
        return res.status(200).json({invalid: false, result: "ok", token, UD: UD[1]})
    } catch (e) {
        console.log(e);
        return res.status(200).json({invalid: true, result: e})
    }
};