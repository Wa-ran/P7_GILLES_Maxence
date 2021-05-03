const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'webp',
  'image/jpeg': 'webp',
  'image/png': 'webp',
  'image/webp': 'webp'
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/temp');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('_') + Date.now();
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name + '.' + extension);
  }
});

module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/((image)\/((jpg)|(jpeg)|(png)|(webp)))/)) {
      cb(null, true)
    } else {
      cb(new Error("Le format de l'image n'est pas accepté."), false)
    }
  }
})
.single('avatar');

// exports.avatar = (req, res, next) => {
//   let storage = multer.diskStorage({
//     destination: (cb) => {
//       cb(null, '../images/avatars');
//     },
//     filename: (file, cb) => {
//       const name = req.body.id + "_avatar";
//       const extension = MIME_TYPES[file.mimetype];
//       cb(null, name + '.' + extension);
//     }
//   })

//   multer({
//     storage: storage,
//     fileFilter: fileFilter
//   })
//   .single('avatar')
// };


// exports.avatar = multer({
//   dest: '../images/avatars',
//   rename: function (fieldname, filename) {
//     return 'avatar'+Date.now();
//   }
// }), function(req, res) {
//   // resize image
//   sharp(newPath).resize(300, 200).toFile(newPath, function(err) {
//     if (err) {
//       throw err;
//     }
//     // output.jpg is a 300 pixels wide and 200 pixels high image
//     // containing a scaled and cropped version of input.jpg
//     res.json(newPath);
//   });
// });