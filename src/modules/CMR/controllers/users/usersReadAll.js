import UsersModel from "../../models/UserModel";

export const userReadAll = async (req, res) => {
  let users;
  let _id = req.body?.userId;

  try {
    if (_id) {
      users = await UsersModel.find({_id}).select('-tmpPass -pass');
    } else {
      users = await UsersModel.find().sort({date: -1}).select('-tmpPass -pass').limit(25);
    }

    return res.status(200).json({invalid: false, arr: users})
  } catch (e) {
    console.log(e);

    return res.status(200).json({invalid: true, err: e})
  }
};