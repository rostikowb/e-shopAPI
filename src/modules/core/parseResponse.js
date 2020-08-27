import bodyParser from 'body-parser';

export default function parseResponse(app) {
  app.use(bodyParser.urlencoded({ extended: false },{limit: '5mb'})); // support encoded bodies
  app.use(bodyParser.json({limit: '5mb'})); // support json encoded bodies
}
