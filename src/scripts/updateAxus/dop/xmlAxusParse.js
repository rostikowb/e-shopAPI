import {parseString} from "xml2js";

export const xmlAxusParse = async (xml) =>{
  return await new Promise((resolve, reject) => {
    parseString(xml, function (err, result) {
      if (!err) {
        resolve(result.yml_catalog.shop[0].offers[0].offer)
      } else {
        reject(err)
      }
    });
  });
}