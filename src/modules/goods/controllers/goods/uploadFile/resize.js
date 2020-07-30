// import sharp from "sharp";
//
// export default async file=>{
//
//     let image = sharp(file);
//     let metadata = await image.metadata();
//
//     if (metadata.width > 1200) {
//         image = await image.resize(1200)
//             .webp({quality: 90})
//             .toBuffer();
//     } else {
//         image = image
//             .webp({quality: 90})
//             .toBuffer();
//     }
//
//     return image;
// }