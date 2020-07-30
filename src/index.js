require('dotenv').config();
import express from 'express';
import {mongoConnection} from './modules/core/db';
import logger from './modules/core/logger';
import parseResponse from './modules/core/parseResponse';
import ignoreFavicon from './modules/core/ignoreFavicon';
import routes from './modules/core/routes';
import cors from './modules/core/cors';
import errorHandling from './modules/core/errorHandling';
import uploads from './modules/core/uploadsFile';
import {axusInsertMany, search} from "./yamlConverter";


const PORT = process.env.PORT || 5000;
const app = express();

app.disable('x-powered-by'); // DISABLE EXPRESS SIGNATURE
mongoConnection();
logger(app);
parseResponse(app);
cors(app);
ignoreFavicon(app);
uploads(app);
routes(app);
errorHandling(app);

// axusInsertMany();

// search();


app.listen(PORT, () => {
  console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});


