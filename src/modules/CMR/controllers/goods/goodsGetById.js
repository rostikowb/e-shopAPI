import Goods from '../../models/GoodsModel';
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
                    res.status(200).json(doc);
                } else {
                    res.status(200).json('Такого товара нет в базе');
                }
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({error: err});
            });
    } else {
        res.status(200).json('Такого товара нет в базе');
    }
};
export default goodsGetById;
