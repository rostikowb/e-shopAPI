import UsersModel from "../../models/UserModel";

export const userReadAll = async (req, res) => {
    let users;
    let userId = req.body?.userId;

    try {
        users = userId ?
            await UsersModel.find({_id: userId}) :
            await UsersModel.find().sort({date: -1}).limit(25);
        return res.status(200).json({invalid: false, arr: users})
    } catch (e) {
        console.log(e);
        return res.status(200).json({invalid: true, err: e})
    }
};