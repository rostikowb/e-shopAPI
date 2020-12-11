import ParamsModel from "../../models/ParamsModel";

export const filterRead = async (req, res) =>{
  const ctgrId = req.params.ctgrId ;

  const result = await ParamsModel.findOne({ctgrId}).select("prm rangePrc").exec()

  // console.log(result);

  return res.status(200).json({invalid: false, msg: null, result})
}