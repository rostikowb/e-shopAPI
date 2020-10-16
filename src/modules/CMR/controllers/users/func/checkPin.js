import User from "../../../models/UserModel";

export const checkPin = async (req) =>{
    const email = req.body?.email;
    const dateNow = Date.now();
    const pin = req.body?.pin;

    let user = await User.findOne({email}).exec()

    if(!user)
        return {invalid: true, msg: 'Пользователь с таким Email не обнаружен'}

    if(user?.tmpPass?.date && (user?.tmpPass?.date < dateNow))
        return {invalid: true, msg: 'Время действия пин-кода(20м) истекло, начните сначала. В случае возникновения проблем напишите нам'}

    if(Number(user?.tmpPass?.pin) !== Number(pin))
        return {invalid: true, msg: 'Неверный пин-код, попробуйте снова'}

    return {invalid: false, user}
}