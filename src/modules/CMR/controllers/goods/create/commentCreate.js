import Goods from "../../../models/GoodsModel";
import Bought from "../../../models/BoughtModel";
import User from "../../../models/UserModel";

export const commentCreate = async (req, res) => {

    let userId = req?.userId;
    let boughtId = req?.body?.boughtId;
    let goodsId = req?.body?.goodsId;
    let name = req?.body?.name;
    let voice = req?.body?.voice;
    let posi = Number(voice) > 2;
    let msg = req?.body?.msg;
    let plus = req?.body?.plus;
    let minus = req?.body?.minus;
    let bought;
    let bdPromise;
    let isComment = false;
    let gIndex = null;
    let date = Date.now();
    let voiceAll = 0;
    let voiceCount = 0;


    if (!userId || !boughtId || !goodsId || !name || !voice || !msg || !plus || !minus)
        return res.status(200).json({
            invalid: true,
            msg: 'Заполните пожалуйста все поля!'
        });

    if (
        !(name.length >= 3 && name.length <= 15) ||
        !(voice >= 0 && voice <= 5) ||
        !(msg.length >= 50 && msg.length <= 800) ||
        !(plus.length >= 5 && plus.length <= 50) ||
        !(minus.length >= 5 && minus.length <= 50)
    )
        return res.status(200).json({
            invalid: true,
            msg: 'Соблюдайте ограничения на количество символов!'
        });

    try {
        bought = await Bought.findById(boughtId);

        bought.goods.forEach((item, index) => {
            if (item.goodsId.toString() === goodsId.toString() && !item.comment) {
                isComment = true;
                gIndex = index;
            }
        });

        if (isComment) {

            bdPromise = await Promise.all([
                Goods.findById(goodsId),
                Bought.findById(boughtId),
                User.findById(userId),
            ]);

            bdPromise[0].comments.push({userId, name, posi, voice, date, content: {msg, plus, minus}});
            bdPromise[1].goods[gIndex].comment = true;
            bdPromise[0].comments.forEach((item, index)=>{
                voiceAll += item.voice;
                voiceCount = index + 1;
            });
            bdPromise[0].rating = voiceAll / voiceCount;
            bdPromise[2].cupon.push(5);

            Promise.all([
                bdPromise[0].save(),
                bdPromise[1].save(),
                bdPromise[2].save(),
            ]).then(result => {
                if (result[0] && result[1])
                    return res.status(200).json({invalid: false, oneGoods: result[0], gIndex})
            }).catch(err => {
                console.trace(err);
                return res.status(200).json({invalid: true, msg: 'Что-то пошло не так, попробуйте еще раз!'})
            });
        } else {
            return res.status(200).json({invalid: true, msg: 'Вы уже оставляли отзыв на этот товар!'})
        }
    } catch (e) {
        console.trace(e);
        return res.status(200).json({invalid: true, msg: 'Что-то пошло не так, попробуйте еще раз!'})
    }


    // return res.status(200).json({ss: 'ss'});


};