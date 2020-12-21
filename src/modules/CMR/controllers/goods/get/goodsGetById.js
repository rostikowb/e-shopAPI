import Goods from '../../../models/GoodsModel';
import mongoose from 'mongoose';

const goodsGetById = (req, res) => {
    let select = '';
    if(req?.body?.isAdmin){
        select = '-__v'
    } else {
        select = '-__v -optPrc -dopPrc -drUrl'
    }
    const id = req.params.goodsId;
    if (mongoose.Types.ObjectId.isValid(id)) {
        Goods.findById(id)
            .select(select)
            .exec()
            .then(doc => {
                if (doc) {
                    // console.log(doc);
                    res.status(200).json(doc);
                } else {
                    console.log("ERROR::: not found goodsId: ", id);
                    res.status(200).json(false);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({error: err});
            });
    } else {
        console.log("ERROR::: invalid ID: ", id);
        res.status(200).json(false);
    }
};
export default goodsGetById;
