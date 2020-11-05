import GoodsModel from "../../../models/GoodsModel";

export const goodsSearch = async (req, res) => {
  const words = req.body?.words;
  console.log('words', words);
  if (!words) return res.status(200).json({invalid: true, msg: null})

  const result = await GoodsModel.find(
    {$text: {$search: words}},
    {score: {$meta: "textScore"}}
  )
    .sort({score: {$meta: "textScore"}})
    .limit(8)
    .select('nm ctgrId')

  return res.status(200).json({invalid: false, msg: null, result})
}