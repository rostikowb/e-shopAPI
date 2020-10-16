import User from "../../models/UserModel";
import {sendMail} from "./func/mailer";

export const userRestore0 = async (req, res) => {
    // console.log(req.headers);
    try {
        const email = req.body?.email;
        const dateNow = Date.now();
        const date = dateNow+1200000;
        const pin = Math.floor(100000 + Math.random() * 900000);

        let user = await User.findOne({email}).exec()

        if(!user)
            return res.status(200).json({invalid: true, msg: 'Пользователь с таким Email не обнаружен'})

        if(user?.tmpPass?.date && (user?.tmpPass?.date > dateNow))
            return res.status(200).json({invalid: false, msg: 'Старый код все еще активен, не забудьте проверить спам. В случае возникновения проблем напишите нам'})

        try{
            await sendMail(email, pin);
        }catch (e) {
            console.error(new Date(dateNow), e);
            return res.status(200).json({invalid: true, msg: 'Возникла проблема с отправкой почты, попробуйте позже или напишите нам'})
        }

        user.tmpPass = {pin, date};
        await user.save(err=>{
            if(err) return res.status(200).json({invalid: true, msg:err})
        });

        return res.status(200).json({invalid: false})
    } catch (e) {
        console.error(new Date(Date.now()), e);
        return res.status(200).json({invalid: true, msg:e})
    }

};