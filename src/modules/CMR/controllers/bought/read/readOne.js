import BoughtModel from "../../../models/BoughtModel";
import mongoose from "mongoose";

export const boughtReadOne = async (req, res) => {
  const _id = req.params?.id
  console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(200).json({invalid: true, err: "Invalid userId"})

  try {
    const order = await BoughtModel.findOne({_id});
    return res.status(200).json({invalid: false, order})
  } catch (e) {
    console.log(e);
    return res.status(200).json({invalid: true, err: e})
  }
};