import Goods from "../../../../modules/CMR/models/GoodsModel";
import {imageAxusSave} from "./imgAxusSave";

export const creategoodsAxus = async (obj, item) =>{
  try{
    const goods = await Goods.create(obj);

    let imgArr = await imageAxusSave(item, goods)

    await Goods.updateOne({_id: goods._id}, {img: imgArr.reverse()});

    return false
  }catch (e) {
    // console.log(e);
    return true
  }
}