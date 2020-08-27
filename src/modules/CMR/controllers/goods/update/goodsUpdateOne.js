import Goods from '../../../models/GoodsModel';

export const goodsUpdateOne = async (req, res) => {


    const _id = req.body?.obj?._id;
    const avlbl = req.body?.obj?.avlbl;
    const drUrl = req.body?.obj?.drUrl;
    const ctgrId = req.body?.obj?.ctgrId;
    const shipper = req.body?.obj?.shipper;
    const drPaId = req.body?.obj?.drPaId;
    const optPrc = req.body?.obj?.optPrc;
    const dopPrc = req.body?.obj?.dopPrc;
    const dscnt = req.body?.obj?.dscnt;
    const rtlPrc = req.body?.obj?.rtlPrc;
    const dscrptn = req.body?.obj?.dscrptn;
    const img = req.body?.obj?.img;
    const mdl = req.body?.obj?.mdl;
    const nm = req.body?.obj?.nm;
    const prm = req.body?.obj?.prm;
    const stck_qntt = req.body?.obj?.stck_qntt;
    const vndr = req.body?.obj?.vndr;


    const obj = {
        avlbl,
        drUrl,
        ctgrId,
        shipper,
        drPaId,
        optPrc,
        dopPrc,
        dscnt,
        rtlPrc,
        dscrptn,
        img,
        mdl,
        nm,
        prm,
        stck_qntt,
        vndr,
        ready: 2,
    };
    // console.log(obj);

    try {
        let goods = await Goods.updateOne({_id}, obj);
        console.log(goods);
        res.status(200).json({invalid: false, msg: goods})
    } catch (e) {
        console.log(e);
        res.status(200).json({invalid: true, msg: e})
    }

};