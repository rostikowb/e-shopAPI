import Goods from '../../../models/GoodsModel';

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

const addFiltToPar = (filArr) => {
  const arr = {$and: []};
  let rtlPrc = false;
  let i = 0;

  filArr.forEach((item) => {

    if (item.name === 'Цена') {
      rtlPrc = item.valueArr[0].split('-')
    } else {
      arr.$and.push({$or: []})
      item.valueArr.forEach(value => {
        arr.$and[i].$or.push({"prm.name": item.name, "prm.value": value})
      })
      i++
    }
  })

  return {arr, rtlPrc}
}


export const goodsGetAll = (req, res) => {

  let catalog = req.params['catalog'];
  console.log('catalog', catalog);
  let page = req.query['page'];
  let filter = req.body?.filter
  let sort = sortF(req.query['sort'], {avlbl: -1});
  let findParam = {};

  if (filter) {
    const params = addFiltToPar(filter);

    if (params.arr.$and.length) findParam = params.arr;
    if (params.rtlPrc) findParam.rtlPrc = {$gte: Number(params.rtlPrc[0]), $lte: Number(params.rtlPrc[1])}
  }

  if (catalog) findParam.ctgrId = Number(catalog);

  sort.ready = -1;
  sort._id = 1;

  Goods.find(findParam)
    .sort(sort)
    .skip(page ? page * 29 : 0)
    .limit(29)
    .select('-__v -dscrptn -drUrl -mdl -optPrc -dopPrc -drUrl')
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log("err", err);
      res.status(200).json(err);
    });
};

