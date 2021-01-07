import {avlblDel} from "./scripts/avlblDel";
require('dotenv').config();
import express from 'express';
import {mongoConnection} from './modules/core/db';
import logger from './modules/core/logger';
import parseResponse from './modules/core/parseResponse';
import ignoreFavicon from './modules/core/ignoreFavicon';
import routes from './modules/core/rootRoutes';
import cors from './modules/core/cors';
import errorHandling from './modules/core/errorHandling';
import uploads from './modules/core/uploadsFile';
import {axusUpdateGoods} from "./scripts/updateAxus/updateAxus";
import {goodsCount} from "./scripts/goodsCaunt";
import {filterColector} from "./scripts/filterColector/filterColector";
import {botInit} from "./modules/core/botInit";
import {filterRestruct} from "./scripts/filterRestruct/filterRestruct";

const PORT = process.env.PORT || 5000;
const app = express();

app.disable('x-powered-by'); // ОТКЛЮЧАЕМ EXPRESS SIGNATURE
mongoConnection();
logger(app);
cors(app);
botInit(app).then(() => {
  parseResponse(app);
  ignoreFavicon(app);
  uploads(app);
  routes(app);
  errorHandling(app);
});


app.listen(PORT, () => {
  console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});

// filterRestruct()

// goodsCount()
// avlblDel().then(()=>{
//
// })
// filterColector()
// axusUpdateGoods()
