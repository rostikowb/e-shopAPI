import {getXmlAxus} from "./dop/getXml";
import {xmlAxusParse} from "./dop/xmlAxusParse";
import {objCreate} from "./dop/objCreate";
import {creategoodsAxus} from "./dop/createGoods/createGoodsAxus";
import {updateGoodsAxus} from "./dop/updateGoods/updateGoodsAxus";

export const axusUpdateGoods = async () => {
  try {
    const xml = await getXmlAxus()
    const xmlArr = await xmlAxusParse(xml);
    // let i = 5;
    let i = xmlArr.length;

    const recursive = async () => {
      i--;
      console.log(i);
      if(i < 2093){

        let item = xmlArr[i];
        const obj = objCreate(item);

        if (obj.avlbl === "true") {
          const goodsIs = await creategoodsAxus(obj, item)

          if (goodsIs) await updateGoodsAxus(obj)
        } else{
          await updateGoodsAxus(obj)
        }
      }

      if (i) await recursive();

    }
    await recursive();

  } catch (e) {
    console.log("GLOBAL UPDATE_AXUS ERROR:::", e);
  }
};