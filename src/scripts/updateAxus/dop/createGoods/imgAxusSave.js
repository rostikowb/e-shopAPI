import bent from "bent";
import {saveImg} from "../../../../modules/helpers/dopFunc";
import md5 from "md5"

export const imageAxusSave = async (item, goods) =>{
  let imgArr = [];
  let u = item.picture?.length;
  // console.log('u', u);
  const getAndSaveImg = async () => {
    u--;
    try {
      let imgBase;
      try {
        imgBase = await getImg(item.picture[u]);
      } catch (e) {
        try {
          imgBase = await getImg(item.picture[u]);
        } catch (e) {
          try {
            imgBase = await getImg(item.picture[u]);
          } catch (e) {
            console.log(e);
          }
        }
      }

      let name = md5(item.picture[u]);
      // console.log(name);
      if (imgBase) {
        await saveImg(imgBase, goods._id, name);
        imgArr = [...imgArr, name]
      }


    } catch (e) {
      console.log(e);
    }

    if (u) {
      await getAndSaveImg()
    }
  };
  await getAndSaveImg();

  return imgArr;
}

export const getImg = async (url) => {
  return await bent(
    url,
    "string",
    "GET",
    "buffer",
    200
  )();

  // await sharp(Buffer.from(base64, 'base64'))
  //    .resize({width: 400, height: null})
  //    .webp({quality: 90})
  //    .toFile(`./static/555.webp`)
};