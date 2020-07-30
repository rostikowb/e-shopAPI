import Goods from '../../models/GoodsModel';

const sortF = (sort, sortObj) => {
    console.log(sort);
    switch (sort) {
        // case 'random':
        //     sort.prc = -1;
        case 'priceMinMax':
            sortObj.rtlPrc = 1;
            return sortObj;
        case 'priceMaxMin':
            sortObj.rtlPrc = -1;
            return sortObj;
        case 'byRating':
            sortObj.rtng = -1;
            return sortObj;
        case 'byDate':
            sortObj.data = 1;
            return sortObj;
        default:
            return sortObj;
    }
};


const goodsGetAll = (req, res) => {
        // console.log(req.query);
        let catalog = req.params['catalog'];
        let page = req.query['page'];
        let sort = sortF(req.query['sort'], {avlbl: -1});
        let findParam = {};
        if (catalog) {
            findParam.ctgrId = catalog
        }
        // console.log();


        console.log(sort);

        Goods.find(findParam)
            .skip(page ? page * 59 : 0)
            .limit(59)
            .sort(sort)
            .select('-__v -dscrptn -drUrl -mdl -optPrc -dopPrc -drUrl')
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
;

export default goodsGetAll;