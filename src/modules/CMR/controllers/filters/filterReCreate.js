import Params from "../../models/ParamsModel";
import Goods from "../../models/GoodsModel";
import {filtersAddToBd} from "./lib/filtersAddToBd";
import {prmItemCheck} from "./lib/prmItemCheck";
import {priceRangeCheck} from "./lib/priceRangeCheck";
import {prmSort} from "./lib/prmSort";

export const filterReCreate = async (req, res) => {

  try {
    try{
      await Params.collection.drop();
    }catch (e) {

    }


    const goods = Goods.find()
    const items = await goods.select('prm ctgrId rtlPrc')
    let arr = {}

    items.forEach((item) => {

      if (!arr[item.ctgrId]) arr[item.ctgrId] = {prm: {}, prcRange: {gte: 100000, lte: 0}};

      arr[item.ctgrId].prm = prmItemCheck(arr[item.ctgrId].prm, item.prm);
      arr[item.ctgrId].prcRange = priceRangeCheck(arr[item.ctgrId].prcRange, item.rtlPrc);

    })

    arr = prmSort(arr)
    await filtersAddToBd(arr)

    return res.status(200).json({invalid: false, msg: 'ok'});
  } catch (e) {
    return res.status(200).json({invalid: true, msg: 'ERROR:::: ' + e});
  }
}