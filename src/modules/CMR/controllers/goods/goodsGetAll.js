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
            sortObj.rating = -1;
            return sortObj;
        // case 'byDate':
        //     sortObj.data = 1;
        //     return sortObj;
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

        sort.ready = -1;
        sort._id = 1;

    // console.log(sort);
    Goods.find(findParam)
            .sort(sort)
            .skip(page ? page * 29 : 0)
            .limit(29)
            .select('-__v -dscrptn -drUrl -mdl -optPrc -dopPrc -drUrl')
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                res.status(200).json(err);
            });
    };

export default goodsGetAll;