import Goods from '../../../models/GoodsModel';

export const getAllId = async (req, res)=>{
  const result = await Goods.find().select('_id ctgrId nm').limit(5)

  return res.status(200).json(result)
}