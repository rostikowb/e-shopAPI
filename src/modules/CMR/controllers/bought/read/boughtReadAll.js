import BoughtModel from "../../../models/BoughtModel";

export const boughtReadAll = async (req, res) => {
    const userId = req.body?.userId
    let bought;
    try {
        if (req.body?.arr?.length) {
            bought = await BoughtModel.find({
                '_id': {$in: req.body?.arr}
            }).sort({date: -1}).limit(20);
        } else {
            if(!userId)bought = await BoughtModel.find().sort({date: -1}).limit(30);
            else await BoughtModel.find({"UD.userId": userId}).sort({date: -1}).limit(50);
        }
        return res.status(200).json({invalid: false, arr: bought})
    } catch (e) {
        console.log(e);
        return res.status(200).json({invalid: true, err: e})
    }
};