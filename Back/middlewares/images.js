const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'webp',
  'image/jpeg': 'webp',
  'image/png': 'webp',
  'image/webp': 'webp'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');

router.post('/uploadAvatar', 
multer({
  dest: './public/uploads/images/avatars',
  rename: function (fieldname, filename) {
    return 'avatar'+Date.now();
  }
}), function(req, res) {
  // resize image
  sharp(newPath).resize(300, 200).toFile(newPath, function(err) {
    if (err) {
      throw err;
    }
    // output.jpg is a 300 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
    res.json(newPath);
  });
});