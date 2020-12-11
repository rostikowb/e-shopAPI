import Goods from "../../../../modules/CMR/models/GoodsModel";

export const updateGoodsAxus = async (obj) => {
  try {
    const goods = await Goods.findOne({drUrl: obj.drUrl}).exec();

    const change = {}

    if (goods.optPrc !== Number(obj.optPrc)) {
      change.optPrc = Number(obj.optPrc);
      change.rtlPrc = Number(obj.optPrc + Number(obj.optPrc / 100) * Number(goods.dopPrc - goods.dscnt))
    }
    if (goods.stck_qntt !== Number(obj.stck_qntt)) change.stck_qntt = Number(obj.stck_qntt)

    if (goods.avlbl !== obj.avlbl) change.avlbl = obj.avlbl

      if (Object.keys(change).length !== 0) {
        await Goods.updateOne({_id: goods._id}, change);
      }

  } catch (e) {

  }
}