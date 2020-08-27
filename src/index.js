import {sss} from "./ыыыы";

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

import {axusInsertMany, axusInsertToDB, priceCorect, search, upMany} from "./yamlConverter";

const PORT = process.env.PORT || 5000;
const app = express();

app.disable('x-powered-by'); // ОТКЛЮЧАЕМ EXPRESS SIGNATURE
mongoConnection();
logger(app);
cors(app);
parseResponse(app);
ignoreFavicon(app);
uploads(app);
routes(app);
errorHandling(app);

app.listen(PORT, () => {
  console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});

// axusInsertMany();

// upMany();

// test().then(t=>{
//     console.log(t);
// }).catch(err=>{
//     console.log(err);
// });

// console.log(path.dirname('./src/axus_all_dropprice.xml'));


// axusInsertToDB();

// sss();

// search();
// priceCorect();

// let p = Promise.resolve();

// promiseCreators.reduce((n=Promise.resolve(),t)=>n.then(t));
// promiseCreators.forEach(f => p = p.then(f))