import GoodsModel from "../../../models/GoodsModel";

export const goodsSearch = async (req, res) => {
  const words = req.body?.words;
  const catalog = req.body?.catalog;
  const find = {$text: {$search: words}}
  const sort = {
    avlbl: -1,
    score: {$meta: "textScore"},
    ready: -1,
    _id: 1,
  }

  if (!words) return res.status(200).json({invalid: true, msg: null})
  if (catalog) find.ctgrId = catalog;

  const result = await GoodsModel.find(find, {score: {$meta: "textScore"}})
    .sort(sort)
    .limit(30)
    .select('-__v -dscrptn -drUrl -mdl -optPrc -dopPrc -drUrl')

  return res.status(200).json({invalid: false, msg: null, result})
}