import mongoose from 'mongoose';
import Goods from '../../../models/GoodsModel';

export default async function todoCreate(req, res) {
    Goods.find({title: req.body.title}).then(result => {
        if (result.length === 1) {
            return res.status(409).json({message: 'Така новина вже є'});
        }

        const _id = new mongoose.Types.ObjectId();
        const news = new Goods({
            _id,
            title: req.body.title,
            short: req.body.short,
            content: req.body.content,
            key: req.body.key,
            date: req.body.date,
        });
        news
            .save()
            .then(
                res.status(200).json({
                    message: 'News create!',
                    createdProduct: news,
                }),
            )
            .catch(err => {
                res.status(500).json({
                    error: err,
                });
            });
    });
}
