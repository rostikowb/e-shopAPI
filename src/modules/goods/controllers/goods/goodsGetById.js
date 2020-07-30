import Goods from '../../models/GoodsModel';
import mongoose from 'mongoose';

const goodsGetById = (req, res) => {
    const id = req.params.goodsId;
    console.log(id);
    if (mongoose.Types.ObjectId.isValid(id)) {
        Goods.findById(id)
            .select('-__v -optPrc -dopPrc -drUrl')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json('Новини з таким id не існує');
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    } else {
        res.status(404).json('Новини з таким id не існує');
    }
};
export default goodsGetById;
