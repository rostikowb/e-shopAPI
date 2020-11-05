import Goods from '../../../models/GoodsModel';
import mongoose from "mongoose";

export const goodsCreateStub = async (req, res)=>{

    try {
        const result = await Goods.create({_id: new mongoose.Types.ObjectId(),ready:0});
        console.log(result);
        return res.status(200).json({invalid:false, result});
    }catch (e) {
        console.log(e);
        return res.status(200).json({invalid: true, msg: e});
    }


};