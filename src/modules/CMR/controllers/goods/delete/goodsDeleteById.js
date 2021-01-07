import GoodsModel from '../../../models/GoodsModel';

export const goodsDeleteById = (req, res) => {
  const id = req.body?._id;

  GoodsModel.remove({ _id: id })
    .exec()
    .then(doc => {
      if (doc.n) {
        return res.status(200).json({invalid: false});
      } else {
        return res.status(200).json({invalid: true, msg:'not found'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

