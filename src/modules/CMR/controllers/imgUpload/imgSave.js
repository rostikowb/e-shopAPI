import {saveImg} from "../../../helpers/dopFunc";
import Goods from '../../models/GoodsModel';
const md5 = require("md5");

export const imgSaveToStatic = async (req, res) => {
    const base64 = req.body?.file?.split(';base64,').pop();
    const count = req.body?.count;
    const pathname = req.body?._id;
    const _id = req.body?._id;
    let name = md5(req.body?.name);

    let result;

    try {
        result = await saveImg(base64, pathname, name);
        // console.log(count);
        if (!result?.invalid) {
            let goods = await Goods.findById(_id);
            goods.img[count] = name;
            await Goods.updateOne({ _id }, { img:  goods.img });

            return res.status(200).json({invalid: false, arr: goods.img})
        } else {
            return res.status(200).json(result)
        }
    } catch (e) {
        console.log(e);
        return res.status(200).json({invalid: false})
    }


    // try {
    //     let tickets = await TicketsModel.find().sort({date: -1}).limit(50);
    //     return res.status(200).json({invalid: false, arr: tickets})
    // } catch (e) {
    //     console.log(e);
    //     return res.status(200).json({invalid: true, err: e})
    // }
};