import mongoose from "mongoose";

export const objCreate = (item) =>{
  const discount = 0;
  const dopProc = 50;
  const rtlPrc = Math.round(Number(Number(item.price[0]) + Number(item.price[0] / 100) * Number(dopProc - discount)));

  return {
    _id: new mongoose.Types.ObjectId(),
    shipper: 'axus',
    ready: 1,
    avlbl: item.$.available,
    //dropshipURL
    drUrl: item.url[0],
    //price
    optPrc: Number(item.price[0]),
    dopPrc: dopProc,
    dscnt: discount,
    rtlPrc: rtlPrc,
    //currencyId
    crrncId: item.currencyId[0],
    //categoryId
    ctgrId: Number(item.categoryId[0]),
    // img: item.picture,
    //name
    nm: item.name[0],
    //vendor
    vndr: item.vendor[0],
    //model
    mdl: item.model[0],
    //description
    dscrptn: item.description[0],
    stck_qntt: !item.stock_quantity ? 0 : Number(item.stock_quantity[0]),
    //param
    prm: !item.param ? null : item.param.map(it => {
      return {
        name: it.$.name,
        value: it['_']
      }
    })
  };
}