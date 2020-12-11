import Params from "../../../models/ParamsModel";

export const filtersAddToBd = async (arr) =>{

  const arrCat = Object.keys(arr);
  let i = arrCat.length

  async function recursCreate(){
    i--
    const item = arrCat[i]

    const obj = {
      ctgrId: item,
      prm: arr[item].prm,
      rangePrc: arr[item].prcRange
    }

    Params.create(obj)

    if(i) await recursCreate()
  }
  await recursCreate()
}