import sharp from "sharp";
import {promises as fs} from "fs";

const absoPath = '/var/www/api/static';

export const saveImg = async (base64, path, name) => {
    try {
        await Promise.all([
            fs.mkdir(`${absoPath}/jpeg/${path}`),
            fs.mkdir(`${absoPath}/webp/${path}`)
        ]);
    } catch (e) {

    }
    try {
        await Promise.all([
            sharp(Buffer.from(base64, 'base64'))
                .resize({ width: 400, height:null })
                .webp({quality: 90})
                .toFile(`${absoPath}/webp/${path}/${name}-400.webp`),

            sharp(Buffer.from(base64, 'base64'))
                .resize({ width: 600, height:null })
                .webp({quality: 80})
                .toFile(`${absoPath}/webp/${path}/${name}-600.webp`),

            sharp(Buffer.from(base64, 'base64'))
                .resize({ width: 1024, height:null })
                .webp({quality: 100})
                .toFile(`${absoPath}/webp/${path}/${name}-1024.webp`),

            // sharp(Buffer.from(base64, 'base64'))
            //     .resize({ width: 1600, height:null })
            //     .webp({quality: 100})
            //     .toFile(`${absoPath}/webp/${path}/${name}-1600.webp`),

            sharp(Buffer.from(base64, 'base64'))
                .resize({ width: 400, height:null })
                .jpeg({quality: 90})
                .toFile(`${absoPath}/jpeg/${path}/${name}-400.jpeg`),

            sharp(Buffer.from(base64, 'base64'))
                .resize({ width: 600, height:null })
                .jpeg({quality: 80})
                .toFile(`${absoPath}/jpeg/${path}/${name}-600.jpeg`),

            sharp(Buffer.from(base64, 'base64'))
                .resize({ width: 1024, height:null })
                .jpeg({quality: 100})
                .toFile(`${absoPath}/jpeg/${path}/${name}-1024.jpeg`),

            // sharp(Buffer.from(base64, 'base64'))
            //     .resize({ width: 1600, height:null })
            //     .jpeg({quality: 100})
            //     .toFile(`${absoPath}/jpeg/${path}/${name}-1600.jpeg`),
        ]);
        // console.log(result.length);
        return {invalid: false,};
    } catch (e) {
        console.log(e);
        return {invalid: true, msg:e};
    }
};