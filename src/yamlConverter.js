import mongoose from 'mongoose';
import Goods from './modules/CMR/models/GoodsModel';
import {parseString} from 'xml2js';
import fs from 'fs';
import bent from 'bent';
import {saveImg} from "./modules/class/dopFunc";

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

export const search = () => {
    Goods.find({
            $text: {
                $search: "apple",
                // $language: 'none'
            },
        },
        {
            score: {
                $meta: "textScore"
            }
        }
    ).sort({score: {$meta: "textScore"}}).limit(5)
        .exec().then(c => {
        console.log(c);
    })
    // console.log(res);

};

export const upMany = () => {
    Goods.updateMany({}, {rating: 0, comments: []}).then(t => {
        console.log(t);
    }).catch(err => {
        console.log(err);
    })
    // console.log(res);

};

export const getImg = async (url) => {
    return await bent(
        url,
        "string",
        "GET",
        "buffer",
        200
    )();

    // await sharp(Buffer.from(base64, 'base64'))
    //    .resize({width: 400, height: null})
    //    .webp({quality: 90})
    //    .toFile(`./static/555.webp`)
};

export const axusInsertToDB = async () => {

    const xml = fs.readFileSync('/var/www/api/src/axus_all_dropprice.xml').toString();
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

            if (i < 268) {
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
                    goods = await Goods.create(obj);
                } catch (e) {
                    goods = await Goods.findOne({drUrl: obj.drUrl}).exec();
                }

                let imgArr = [];
                let u;
                try {
                    u = item.picture?.length;

                    const getAndSaveImg = async () => {
                        u--;
                        try {
                            let imgBase;
                            try {
                                imgBase = await getImg(item.picture[u]);
                            } catch (e) {
                                try {
                                    imgBase = await getImg(item.picture[u]);
                                } catch (e) {
                                    try {
                                        imgBase = await getImg(item.picture[u]);
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }
                            }

                            let name = md5(item.picture[u]);
                            if (imgBase) {
                                await saveImg(imgBase, goods._id, name);
                                imgArr = [...imgArr, name]
                            }


                        } catch (e) {
                            console.log(e);
                        }

                        if (u) {
                            await getAndSaveImg()
                        }
                    };
                    await getAndSaveImg();

                    try {

                        await Goods.updateOne({_id: goods._id}, {img: imgArr.reverse()});

                    } catch (e) {
                        console.log(e);
                    }
                } catch (e) {

                }


            }
            console.log(i);

            if (i) {
                await recursive();
            }
        };

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