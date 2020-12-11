import Goods from "../modules/CMR/models/GoodsModel";

export const goodsCount = async () =>{
  let goods = Goods.find()
  let items = await goods.select('_id')
  console.log(items.length);
}