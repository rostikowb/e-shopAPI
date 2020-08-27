// import path from 'path';
// import randomstring from 'randomstring';
// import resize from './resize';
// import fs from 'fs';
//
// export default async function todoUploadFile(req, res) {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//
//     const nameFile = randomstring.generate(7) + '.webp';
//     const root = path.join(path.dirname(require.main.filename), '/..') + '/';
//     const data = await resize(req.files.image.data);
//
//     fs.writeFile(root + 'assets/img/' + nameFile, data, err => {
//         if (err) {
//             console.log('errUploadPhoto', err);
//             return res.status(500).send(err);
//         } else {
//             res.status(200).json({data: {link: '/assets/img/' + nameFile}});
//         }
//     });
// };
//
//
