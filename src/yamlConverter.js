import mongoose from 'mongoose';
import Goods from './modules/CMR/models/GoodsModel';
import {parseString} from 'xml2js';
import fs from 'fs';
import bent from 'bent';
import {saveImg} from "./modules/helpers/dopFunc";


const md5 = require("md5");

export const axusInsertMany = () => {
  const xml = fs.readFileSync('./../axus_all_dropprice.xml').toString();
  let res;
  try {
    parseString(xml, function (err, result) {
      let xmlArr = result.yml_catalog.shop[0].offers[0].offer;
      // console.dir(xmlArr[0]);
      let arrObj = [];
      let discount = 0;
      let dopProc = 50;
      xmlArr.forEach(item => {

        if (item.$.available) {
          let itemObj = {
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
            rtlPrc: Number(item.price[0] + Number(item.price[0] / 100) * Number(dopProc - discount)),
            //currencyId
            crrncId: item.currencyId[0],
            //categoryId
            ctgrId: Number(item.categoryId[0]),
            img: item.picture,
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
          arrObj.push(itemObj);
        }
      });
      // console.log(arrObj.length);

      // new Goods(arrObj[1]).save();
      res = Goods.insertMany(arrObj, {ordered: false});
      console.log(res);
    });
  } catch (e) {
    console.warn(e);
  }
};

// export const search = () => {
//     Goods.find({
//             $text: {
//                 $search: "apple",
//                 // $language: 'none'
//             },
//         },
//         {
//             score: {
//                 $meta: "textScore"
//             }
//         }
//     ).sort({score: {$meta: "textScore"}}).limit(5)
//         .exec().then(c => {
//         console.log(c);
//     })
//     // console.log(res);
//
// };

export const upMany = () => {
  Goods.updateMany({}, {rating: 0, comments: []}).then(t => {
    console.log(t);
  }).catch(err => {
    console.log(err);
  })
  // console.log(res);

};



export const axusInsertToDB = async () => {

  // const xml = fs.readFileSync('/var/www/api/src/axus_all_dropprice.xml').toString();

  const url = "https://axus.com.ua/axus_all_dropprice.xml";
  const xml = await bent(url, "string", "GET", 200)();

  let xmlArr;
  let i = 0;
  let discount = 0;
  let dopProc = 50;

  try {
    xmlArr = await new Promise((resolve, reject) => {
      parseString(xml, function (err, result) {
        if (!err) {
          resolve(result.yml_catalog.shop[0].offers[0].offer)
        } else {
          reject(err)
        }
      });
    });

    i = xmlArr.length;

    const recursive = async () => {
      i--;
      let item = xmlArr[i];

      // if (i < 268) {
      const obj = {
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
        rtlPrc: Number(item.price[0] + Number(item.price[0] / 100) * Number(dopProc - discount)),
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
      let goods;
      try {

        if (obj.avlbl == "false") throw 'avlbl'
        goods = await Goods.create(obj);
        console.log(obj.avlbl);
        let imgArr = [];
        let u;
        try {
          u = item.picture?.length;

          // const getAndSaveImg = async () => {
          //   u--;
          //   try {
          //     let imgBase;
          //     try {
          //       imgBase = await getImg(item.picture[u]);
          //     } catch (e) {
          //       try {
          //         imgBase = await getImg(item.picture[u]);
          //       } catch (e) {
          //         try {
          //           imgBase = await getImg(item.picture[u]);
          //         } catch (e) {
          //           console.log(e);
          //         }
          //       }
          //     }
          //
          //     let name = md5(item.picture[u]);
          //     if (imgBase) {
          //       await saveImg(imgBase, goods._id, name);
          //       imgArr = [...imgArr, name]
          //     }
          //
          //
          //   } catch (e) {
          //     console.log(e);
          //   }
          //
          //   if (u) {
          //     await getAndSaveImg()
          //   }
          // };
          // await getAndSaveImg();

          try {

            await Goods.updateOne({_id: goods._id}, {img: imgArr.reverse()});

          } catch (e) {
            console.log(e);
          }
        } catch (e) {

        }

      } catch (e) {
        goods = await Goods.findOne({drUrl: obj.drUrl}).exec();
        // console.log('goods', goods);
        //
        // if(!goods && obj.avlbl == "true"){
        //   Goods.create(obj)
        //
        // }
        // return
        // console.log(!goods , obj.avlbl == "true");
        if (goods.avlbl == "false") {
          await Goods.deleteOne({drUrl: goods.drUrl})
        } else {
          const change = {}

          if (goods.optPrc !== Number(item.price[0])) {
            change.optPrc = Number(item.price[0]);
            change.rtlPrc = Number(item.price[0] + Number(item.price[0] / 100) * Number(goods.dopPrc - goods.dscnt))
          }
          if (goods.stck_qntt !== Number(item.stock_quantity[0])) change.stck_qntt = Number(item.stock_quantity[0])

          if (Object.keys(change).length !== 0) {
            await Goods.updateOne({_id: goods._id}, change);
          }

        }

      }

    }
    console.log(i);

    if (i) {
      await recursive();
    }
    // };

    await recursive();

  } catch (e) {
    console.log(e);
  }
};

// export const priceCorect = async () => {
//     const xml = fs.readFileSync('/var/www/api/src/axus_all_dropprice.xml').toString();
//     let discount = 0;
//     let dopProc = 50;
//     let i;
//     let xmlArr;
//     try {
//         xmlArr = await new Promise((resolve, reject) => {
//             parseString(xml, function (err, result) {
//                 if (!err) {
//                     resolve(result.yml_catalog.shop[0].offers[0].offer)
//                 } else {
//                     reject(err)
//                 }
//             });
//         });
//
//         i = xmlArr.length;
//
//         const recursive = async () => {
//             i--;
//             let item = xmlArr[i];
//
//             // let rtlPrc = Number(Number(item.price[0]) + Number(item.price[0] / 100) * Number(dopProc - discount));
//             // await Goods.updateOne({drUrl:item.url[0]}, {rtlPrc});
//
//             let imgArr = [];
//
//             try {
//                 item.picture.forEach(u=>{
//                     let name = md5(u);
//                     imgArr = [...imgArr, name]
//                 });
//
//
//
//                 await Goods.updateOne({drUrl:item.url[0]}, {rtlPrc});
//             }catch (e) {
//
//             }
//
//
//             if(i){
//                 console.log(i);
//                 await recursive()
//             }
//         };
//         await recursive();
//     } catch {
//     }
//
//
// };