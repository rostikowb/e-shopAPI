import UsersModel from "../../models/UserModel";
import mongoose from "mongoose"

export const userUpdateOne = async (req, res) => {

  const {_id, email, FN, LN, SN, tel, city, branchN, rights} = req.body?.UD;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(200).json({invalid: true, err: "Invalid userId"})

  try {
    let users = await UsersModel.find({_id}).select('-tmpPass -pass');

    users[0].email = email || users[0].email;
    users[0].FN = FN || users[0].FN;
    users[0].LN = LN || users[0].LN;
    users[0].SN = SN || users[0].SN;
    users[0].tel = tel || users[0].tel;
    users[0].city = city || users[0].city;
    users[0].branchN = branchN || users[0].branchN;
    users[0].rights = rights ? rights : users[0].rights;

    users = await users[0].save()

    return res.status(200).json({invalid: false, arr: [users]})
  } catch (e) {
    console.log(e);
    return res.status(200).json({invalid: true, err: "Что-то не так"})
  }
};