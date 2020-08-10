import mongoose from 'mongoose';
import Goods from './modules/goods/models/GoodsModel';
import {parseString} from 'xml2js'
import fs from 'fs'

export const axusInsertMany = () => {
    const xml = fs.readFileSync('./../axus_all_dropprice.xml').toString();
    let res;
    try {
        parseString(xml, function (err, result) {
            let xmlArr = result.yml_catalog.shop[0].offers[0].offer;
            // console.dir(xmlArr[0]);
            let arrObj = [];
            let discount = 20;
            let dopProc = 40;
            xmlArr.forEach(item => {

                let itemObj = {
                    _id: new mongoose.Types.ObjectId(),
                    drPaId: 'axus' + item.$.id,
                    avlbl: item.$.available,
                    //dropshipURL
                    drUrl: item.url[0],
                    //price
                    optPrc: Number(item.price[0]),
                    dopPrc: dopProc,
                    dscnt: discount,
                    rtlPrc: Math.round(Number(item.price[0])*((dopProc/100)+1)),
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
    Goods.updateMany({}, {rating: 0, comments:[]}).then(t=>{
        console.log(t);
    }).catch(err=>{
        console.log(err);
    })
    // console.log(res);

};